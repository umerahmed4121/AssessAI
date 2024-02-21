"use client"

import Dashboard from '@/components/Dashboard'
import { getUserFromCookie } from '@/components/apis/credentialSession'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {

  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    const getData = async () => {
      const user  = await getUserFromCookie()
      if(user){
        if(user.role === 'student') {
          router.push('/dashboard/student')
        } else if(session?.user?.role === 'teacher') {
          router.push('/dashboard/teacher')
        } else {
          router.push('/')
        }
      }
    }
    getData()
  }, [])
  
  while (status === 'loading') {
    return (
      <Dashboard/>
    )
  }

  if (session?.user?.role === null || session?.user?.birthday === null) {
    router.push('/profile/complete')
  } else if(session?.user?.role === 'student') {
    router.push('/dashboard/student')
  } else if(session?.user?.role === 'teacher') {
    router.push('/dashboard/teacher')
  } else {
    router.push('/')
  }
  

  return (
    <Dashboard/>
  )

  
}

export default Page