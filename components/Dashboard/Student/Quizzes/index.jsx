"use client"

import React, { useState } from 'react'
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


const Quizzes = ({ params }) => {

    const router = useRouter()

    const { data, status } = useQuery('quizzes', getQuizzesByParticipant.bind(this, params))
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


            <Link href={`quizzes/create`} onClick={() => setLoading(true)} className='bg-secondary w-10 h-10 sm:w-14 sm:h-14 fixed bottom-10 right-10 rounded-full flex justify-center items-center transition duration-500 delay-200 hover:scale-125 '>
                <FaPlus className='text-white text-3xl' />

            </Link>

        </div>
    )
}

export default Quizzes