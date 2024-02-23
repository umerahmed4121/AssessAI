"use client"

import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoMdOpen } from "react-icons/io";
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react';
import { getQuizzesByCreator, updateQuiz } from './api/quiz';
import Spinner from '@/components/Spinner';
import Loader from '@/components/Loader';
import ToggleButton from '@/components/Utils/ToggleButton';
import { mongoDateToString } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { getUserFromCookie } from '@/components/apis/credentialSession';


const Quizzes = () => {


    // 

    const [user_id, setUser_id] = useState(null)
    const { data: session, status:sessionStatus } = useSession()
    const [component, setComponent] = useState(<Loader visible={true} dashboard={true} />)
  
    useEffect(() => {
      const getData = async () => {
        const user = await getUserFromCookie()
        if (user) {
            setUser_id(user.id)
            queryClient.invalidateQueries("quizzes");
        }
      }
      getData()
    }, [])
  
    useEffect(() => {
      if (sessionStatus === 'authenticated') {
        setUser_id(session.user.id)
        queryClient.invalidateQueries("quizzes");
      }
    }, [sessionStatus])


    const router = useRouter()
    const { data, status } = useQuery('quizzes', getQuizzesByCreator.bind(this, user_id),{enabled: user_id !== null})
    const [loading, setLoading] = useState(false)
    const tableHeaderStyle = 'bg-primary-light p-2'

    const queryClient = useQueryClient();
    
    const updateQuizMutation = useMutation(updateQuiz, {
        onSuccess: () => {
            // Invalidates  cache and refetch
            queryClient.invalidateQueries("quizzes");
        },
    });

    const handleResponseToggle = (quiz) => {
        quiz.isAcceptingResponses = !quiz.isAcceptingResponses;
        updateQuizMutation.mutate(quiz);
    }
    console.log("In components\Dashboard\Teacher\Quizzes\index.jsx \n", data);


    return (
        <div className='w-full'>
            <Loader visible={loading} dashboard={true} />
            <h1 className='w-full text-3xl pt-2 pb-10 text-center'>Quizzes</h1>

            <div className='w-full overflow-auto'>
                <div className='w-full grid items-center grid-cols-5 p-2 min-w-[650px] border border-primary-light rounded-md  '>


                    <div className={tableHeaderStyle}>Title</div>
                    <div className={tableHeaderStyle}>Description</div>
                    <div className={tableHeaderStyle}>Responses</div>
                    <div className={tableHeaderStyle}>Created at</div>
                    <div className={tableHeaderStyle}>Responses</div>

                    {status === 'loading' ?
                        <Spinner visible={true} className={"col-span-5"} /> :

                        data?.map((quiz) => (
                            <>
                                <div className='p-2 flex items-center'>{quiz.title.length > 20 ? quiz.title.substring(0, 20) + "..." : quiz.title}</div>
                                <div className='p-2 flex items-center'>{quiz.description.length > 20 ? quiz.description.substring(0, 20) + "..." : quiz.description}</div>
                                <div className='p-2 cursor-pointer flex items-center gap-2'

                                    onClick={() => {
                                        router.push(`quizzes/responses/${quiz._id}`)
                                    }}
                                >{quiz.assessments[0].responses.length} <IoMdOpen /> </div>
                                <div className='p-2 flex items-center '>{mongoDateToString(quiz.createdAt)}</div>
                                <div className='p-2 flex items-center'>
                                    <ToggleButton
                                        enable={quiz.isAcceptingResponses}
                                        onChange={() => { handleResponseToggle(quiz) }}
                                        className={"w-8 h-4"}
                                        circleClassName={"w-2 h-2"}
                                    />
                                </div>
                            </>


                        )
                        )
                    }

                </div>
            </div>


            <Link href={`quizzes/create`} onClick={() => setLoading(true)} className='bg-secondary w-10 h-10 sm:w-14 sm:h-14 fixed bottom-10 right-10 rounded-full flex justify-center items-center transition duration-500 delay-200 hover:scale-125 '>
                <FaPlus className='text-white text-3xl' />

            </Link>

        </div>
    )
}

export default Quizzes