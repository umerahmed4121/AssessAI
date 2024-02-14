"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { MdNoEncryptionGmailerrorred } from "react-icons/md";

const Auth_Error = () => {

    const router = useRouter()

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center p-2 text-center'>
        <div className=' text-[60px]'><MdNoEncryptionGmailerrorred /></div>
        <h1 className='text-2xl py-10'>This email is already associated with an account</h1>
        <h2 className='text-lg'>You may had created the account with different provider</h2>
        <h2 className='text-lg'>Please try with different provider</h2>
        <button 
        onClick={() => router.push('/auth/login')} 
        className='mt-4 bg-secondary text-white font-bold px-4 py-2 rounded-md'>
            Login again
            </button>
    </div>
  )
}

export default Auth_Error