"use client"

import Responses from '@/components/Dashboard/Teacher/Quizzes/Responses'
import Loader from '@/components/Loader'
import { getUserFromCookie } from '@/components/apis/credentialSession'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'



const Page = ({params}) => {

  return (
      <Responses quiz_id={params.quiz_id} />
  )

}

export default Page