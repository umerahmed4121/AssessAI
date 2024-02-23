"use client"

import Quizzes from '@/components/Dashboard/Teacher/Quizzes'
import Loader from '@/components/Loader'
import { getUserFromCookie } from '@/components/apis/credentialSession'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'



const Page = () => {

  return (
      <Quizzes />
  )

}

export default Page