"use client"

import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react';
import { createResponse, getQuizzesByParticipant } from './api/quiz';
import Spinner from '@/components/Spinner';
import Loader from '@/components/Loader';
import ToggleButton from '@/components/Utils/ToggleButton';
import { mongoDateToString } from '@/utils/date';
import { getUserFromCookie } from '@/components/apis/credentialSession';


const Quizzes = () => {

    const router = useRouter()

     // Getting user_id ----------------------------------------------------
     const { data: session, status:sessionStatus } = useSession()
     const [user_id, setUser_id] = useState(null)
   
     useEffect(() => {
       const getData = async () => {
         const user = await getUserFromCookie()
         if (user) {
           setUser_id(user.id)
         }
       }
       getData()
     }, [])
   
     useEffect(() => {
       if (sessionStatus === 'authenticated') {
         setUser_id(session.user.id)
       }
     }, [sessionStatus])
 
     // ----------------------------------------------------------------------

    const { data, status } = useQuery('quizzes', getQuizzesByParticipant.bind(this, user_id),{enabled: user_id !== null})
    const [loading, setLoading] = useState(false)
    const tableHeaderStyle = 'bg-primary-light p-2'

    const queryClient = useQueryClient();
    const createResponseMutation = useMutation(createResponse, {
        onSuccess: () => {
            // Invalidates  cache and refetch
            queryClient.invalidateQueries("quizzes");
        },
    });


    console.log(data);

    const handleCreateResponse = async (userId, quizId) => {

        createResponseMutation.mutate({ userId, quizId })

    }


    return (
        <div className='w-full'>
            <Loader visible={loading} dashboard={true} />
            <h1 className='w-full text-3xl pt-2 pb-10 text-center'>Quizzes</h1>

            <div className='w-full overflow-auto'>
                <div className='w-full grid items-center grid-cols-5 p-2 min-w-[650px] border border-primary-light rounded-md  '>


                    <div className={tableHeaderStyle}>Title</div>
                    <div className={tableHeaderStyle}>Description</div>
                    <div className={tableHeaderStyle}>Created at</div>
                    <div className={tableHeaderStyle}>Responses</div>
                    <div className={tableHeaderStyle}>Action</div>


                    {status === 'loading' ?
                        <Spinner visible={true} className={"col-span-5"} /> :

                        data?.map((quiz) => (
                            <>
                                <div className='p-2'>{quiz.title.length > 20 ? quiz.title.substring(0, 20) + "..." : quiz.title}</div>
                                <div className='p-2'>{quiz.description.length > 20 ? quiz.description.substring(0, 20) + "..." : quiz.description}</div>
                                <div className='p-2'>{mongoDateToString(quiz.createdAt)}</div>
                                <div className='p-2'>{quiz.isAcceptingResponses ? "Accepting" : "Closed"}</div>
                                {quiz.isAcceptingResponses && (
                                    quiz.responseStatus === "PENDING" ? (
                                        <button
                                            className='px-4 py-2  bg-secondary m-1 w-fit h-fit rounded-md'
                                            onClick={() => {
                                                setLoading(true)
                                                handleCreateResponse(params, quiz._id)
                                            }}
                                        >Start Quiz</button>
                                    ) : (
                                        <button
                                            className='px-4 py-2  bg-primary-light border border-primary-light-2 italic m-1 w-fit h-fit rounded-md'
                                            disabled
                                        >Submitted</button>
                                    )
                                )
                                }
                            </>


                        )
                        )
                    }

                </div>
            </div>


        </div>
    )
}

export default Quizzes