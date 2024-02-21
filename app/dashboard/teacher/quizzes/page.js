"use client"

import Quizzes from '@/components/Dashboard/Teacher/Quizzes'
import Loader from '@/components/Loader'
import { getUserFromCookie } from '@/components/apis/credentialSession'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'



const Page = () => {

  const { data: session, status } = useSession()
  const [component, setComponent] = useState(<Loader visible={true} dashboard={true} />)

  useEffect(() => {
    const getData = async () => {
      const user = await getUserFromCookie()
      if (user) {
        setComponent(<Quizzes params={user.id} />)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      setComponent(<Quizzes params={session.user.id} />)
    }
  }, [status])

  return component

}

export default Page