'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import Link from 'next/link'
import { ColorRing } from 'react-loader-spinner';
import { colors } from '@/styles';
import Loader from '../Loader'


const Complete = () => {

  const { data: session } = useSession()
  const router = useRouter()
  const birthdayRef = useRef(null)
  const [formData, setFormData] = useState({
    birthday: '',
    role: 'student'
  })

  const [loading, setLoading] = useState(false)


  const handleCompleteProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            id: session.user.id,
            birthday: formData.birthday,
            role: formData.role
          }
        )
      })
      if (res.status === 200) {
        const data = await res.json()
        session.user.birthday = data.birthday
        session.user.role = data.role
        router.push('/dashboard')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    
  }



  return (
    <div className='form_container'>
      <Loader visible={loading} />
      <form className='flex flex-col justify-center w-full gap-[2vh]'>
        <motion.h1 className="text-center text-3xl font-bold pb-12">Complete setting up your profile</motion.h1>

        <div className='flex flex-row justify-center gap-3 py-1'>
          <button
            type='button'
            className={`border ${formData.role === 'student' ?
              'border-secondary text-secondary' :
              'border-white text-white'}
                        w-full py-2 rounded`}
            onClick={() => setFormData({ ...formData, role: 'student' })}
          >
            <span className='flex flex-row justify-center items-center gap-2'>Student {formData.role === "student" && (<FaCheckCircle />)}</span>
          </button>
          <button
            type='button'
            className={`border ${formData.role === 'teacher' ?
              'border-secondary text-secondary' :
              'border-white text-white'}
                        w-full py-2 rounded`}
            onClick={() => setFormData({ ...formData, role: 'teacher' })}
          >
            <span className='flex flex-row justify-center items-center gap-2'>Teacher {formData.role === "teacher" && (<FaCheckCircle />)}</span>
          </button>

        </div>

        <input
          required
          id='birthday'
          ref={birthdayRef}
          type="text"
          placeholder="Birthday"
          onFocus={() => { document.querySelector('#birthday').placeholder = 'DD/MM/YYYY' }}
          onBlur={() => { document.querySelector('#birthday').placeholder = 'Birthday' }}
          value={formData.birthday}
          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          className="form_input"
        />

        <div className="text-sm text-center text-wrap mt-8">
          By clicking &quot;Agree&quot;, you agree to our
          <Link href="#" target="_blank" className='px-1 underline text-secondary' >Terms</Link>
          and have read our
          <Link href="#" target="_blank" className='px-1 underline text-secondary'>
            Privacy Policy
          </Link>
        </div>


        <motion.button
          onClick={handleCompleteProfile}
          className='form_button mt-6'
        >Agree</motion.button>



      </form>
    </div>
  )
}

export default Complete