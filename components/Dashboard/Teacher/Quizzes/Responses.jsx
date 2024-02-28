import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { assessQuizWithGpt, getResponsesOfQuiz, updateQuiz } from './api/quiz'
import Loader from '@/components/Loader'
import ResponseCard from './ResponseCard'
import { AssessAIIcon, GPTIcon, GeminiIcon } from '@/icons'
import Image from 'next/image'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'
import { getUserFromCookie } from '@/components/apis/credentialSession'

const Responses = ({ quiz_id }) => {


    const [loading, setLoading] = useState(true)
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


    const [quiz, setQuiz] = useState(null)
    const { data, status } = useQuery('responses', getResponsesOfQuiz.bind(this, { creator_id: user_id, quiz_id: quiz_id }), { enabled: user_id !== null, refetchOnWindowFocus: false})
    console.log("In components/Dashboard/Teacher/Quizzes/Responses.jsx\n", data);
    useEffect(() => {
        if (data) {
            setQuiz(data)
            setLoading(false)
        }
    }, [data])

    const queryClient = useQueryClient()

    const assessWithGptMutation = useMutation(assessQuizWithGpt, {
        onSuccess: () => {
            // Invalidates  cache and refetch
            queryClient.invalidateQueries("responses");
            setLoading(false)
        },
    });

    const updateQuizMutation = useMutation(updateQuiz, {
        onSuccess: () => {
            // Invalidates  cache and refetch
            queryClient.invalidateQueries("responses");
        },
    });

    const handleAssessWithGPT = () => {
        setLoading(true)
        assessWithGptMutation.mutate(quiz_id)
        setShowParticipants(false)
    }

    const [showParticipants, setShowParticipants] = useState(false);
    const toggleShowParticipants = () => {
        setShowParticipants(!showParticipants);
    }

    const handleUpdateAssessment = (assessment_id, response_id, value) => {
        const updatedAssessments = quiz.assessments.map((assessment, index) => {
            if (assessment._id === assessment_id) {
                assessment.responses.map((response, index) => {
                    if (response._id === response_id) {
                        response.obtainedMarks = value;
                    }
                    return response;
                })
            }
            return assessment;
        })
        setQuiz({ ...quiz, assessments: updatedAssessments });

        console.log(quiz);
    }

    const handleUpdateQuiz = () => {
        updateQuizMutation.mutate(quiz);
        setShowParticipants(false)
    }

    return (
        <>
            <Loader visible={loading} dashboard={true} />
            {quiz && (
                <div className='grid grid-cols-1 xl:grid-cols-[70%,28%] gap-[2%]  w-full'>

                    <div className="fixed top-[70px] left-2 sm:left-[calc(30%+10px)] lg:left-[calc(20%+10px)] flex gap-4">
                        <button
                            className=' w-10 h-10 sm:w-14 sm:h-14  rounded-md flex xl:hidden justify-center items-center transition duration-500 delay-200 hover:scale-105 '
                            onClick={() => toggleShowParticipants()}
                        >
                            <BsThreeDotsVertical className='text-white text-3xl' />

                        </button>
                    </div>

                    <div className={`fixed border border-primary-light-2 bg-primary-light ${showParticipants ? " w-[70%] sm:w-[40%] md:w-[35%] lg:w-[20%]" : " w-0 opacity-0"} h-screen right-0 top-[60px] transition-all duration-500`}
                    onMouseLeave={() => setShowParticipants(false)}
                    
                    >
                        <div className='bg-primary-light flex flex-col  rounded-md h-[calc(100vh-113px)] p-4'>

                            <div className="w-full grid grid-cols-1 gap-2 h-full content-between">
                                <div className="w-full">
                                    <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center w-full'
                                        onClick={() => handleAssessWithGPT()}
                                    >
                                        <GeminiIcon className={"w-7"} /> &nbsp; Assess with Gemini
                                    </button>
                                    <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                                        <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                        <span className='text-sm'>OR</span>
                                        <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                    </div>
                                    <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center w-full'

                                    >
                                        {/* <Image src={"/assets/icons/gpt.png"} alt='gpt' width={50} height={50}/> &nbsp; Assess with GPT-4 */}
                                        <GPTIcon /> &nbsp; Assess with GPT-4
                                    </button>
                                    <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                                        <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                        <span className='text-sm'>OR</span>
                                        <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                    </div>
                                    <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center w-full'>
                                        {/* <Image src={"/assets/icons/gpt.png"} alt='gpt' width={50} height={50}/> &nbsp; Assess with GPT-4 */}
                                        <AssessAIIcon /> &nbsp; Assess with Assess AI
                                    </button>
                                </div>
                                <div className="w-full">
                                    <button className='bg-secondary rounded-md p-2 flex items-center justify-center w-full'
                                        onClick={() => handleUpdateQuiz()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col'>
                        <div className='bg-primary m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full text-3xl text-center '>
                            {quiz?.title?.length > 20 ? quiz?.title?.substring(0, 20) + "..." : quiz?.title}
                        </div>
                        <div className='bg-primary m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full text-2xl text-center text-white italic'>
                            {quiz?.description?.length > 20 ? quiz?.description?.substring(0, 20) + "..." : quiz?.description}
                        </div>
                        {quiz?.assessments?.map((assessment, index) => (
                            // <div key={index} className='bg-primary-light m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full text-2xl text-center text-white italic'>
                            //     {assessment?.question?.length > 20 ? assessment?.question?.substring(0, 20) + "..." : assessment?.question}
                            // </div>
                            <ResponseCard assessment={assessment} key={index} handleUpdateAssessment={(assessment_id, response_id, value) => handleUpdateAssessment(assessment_id, response_id, value)} />
                        ))}


                    </div>
                    <div className='bg-primary-light hidden xl:flex xl:flex-col  border border-primary-light-2 rounded-md h-[calc(100vh-113px)] p-4'>

                        <div className="w-full grid grid-cols-1 gap-2 h-full content-between">
                            <div className="w-full">
                                <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center w-full'
                                    onClick={() => handleAssessWithGPT()}
                                >
                                    <GeminiIcon className={"w-7"} /> &nbsp; Assess with Gemini
                                </button>
                                <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                                    <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                    <span className='text-sm'>OR</span>
                                    <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                </div>
                                <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center w-full'

                                >
                                    {/* <Image src={"/assets/icons/gpt.png"} alt='gpt' width={50} height={50}/> &nbsp; Assess with GPT-4 */}
                                    <GPTIcon /> &nbsp; Assess with GPT-4
                                </button>
                                <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                                    <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                    <span className='text-sm'>OR</span>
                                    <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                                </div>
                                <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center w-full'>
                                    {/* <Image src={"/assets/icons/gpt.png"} alt='gpt' width={50} height={50}/> &nbsp; Assess with GPT-4 */}
                                    <AssessAIIcon /> &nbsp; Assess with Assess AI
                                </button>
                            </div>
                            <div className="w-full">
                                <button className='bg-secondary rounded-md p-2 flex items-center justify-center w-full'
                                    onClick={() => handleUpdateQuiz()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>




                    </div>

                </div>
            )}



        </>
    )
}

export default Responses
