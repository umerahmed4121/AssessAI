"use client"

import QuizResponse from '@/components/Dashboard/Student/Quizzes/QuizResponse'
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
                setComponent(<QuizResponse token={params.token} />)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (status === 'authenticated') {
            setComponent(<QuizResponse token={params.token} />)
        }
    }, [status])

    return component

}

export default Page