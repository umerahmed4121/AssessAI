"use client"

import Dashboard from '@/components/Dashboard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Page = () => {

  const router = useRouter()
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
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