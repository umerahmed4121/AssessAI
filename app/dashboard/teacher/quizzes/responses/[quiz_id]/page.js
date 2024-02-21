"use client"

import Responses from '@/components/Dashboard/Teacher/Quizzes/Responses'
import Loader from '@/components/Loader'
import { getUserFromCookie } from '@/components/apis/credentialSession'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'



const Page = ({params}) => {

  const { data: session, status } = useSession()
  const [component, setComponent] = useState(<Loader visible={true} dashboard={true} />)

  useEffect(() => {
    const getData = async () => {
      const user = await getUserFromCookie()
      if (user) {
        setComponent(<Responses user_id={user.id} quiz_id={params.quiz_id} />)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      setComponent(<Responses user_id={session.user.id} quiz_id={params.quiz_id}/>)
    }
  }, [status])

  return component

}

export default Page