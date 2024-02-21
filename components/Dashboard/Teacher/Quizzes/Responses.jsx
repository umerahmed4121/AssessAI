import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getResponsesOfQuiz } from './api/quiz'
import Loader from '@/components/Loader'
import ResponseCard from './ResponseCard'
import { AssessAIIcon, GPTIcon, GeminiIcon } from '@/icons'
import Image from 'next/image'

const Responses = ({ user_id, quiz_id }) => {

    const [loading, setLoading] = useState(false)
    const { data: quiz, status } = useQuery('quizzes', getResponsesOfQuiz.bind(this, { creator_id: user_id, quiz_id: quiz_id }))
    useEffect(() => {
        if (status === 'loading') {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [status])

    return (
        <>
            <Loader visible={loading} dashboard={true} />
            {quiz && (
                <div className='grid sm:grid-cols-[70%,28%] gap-[2%]  w-full'>

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
                            <ResponseCard assessment={assessment} key={index} />
                        ))}


                    </div>
                    <div className='bg-primary-light hidden sm:flex sm:flex-col  border border-primary-light-2 rounded-md h-[calc(100vh-113px)] p-4'>

                        <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center'>
                            <GeminiIcon className={"w-7"}/> &nbsp; Assess with Gemini
                        </button>
                        <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                            <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                            <span className='text-sm'>OR</span>
                            <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                        </div>
                        <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center'>
                            {/* <Image src={"/assets/icons/gpt.png"} alt='gpt' width={50} height={50}/> &nbsp; Assess with GPT-4 */}
                            <GPTIcon/> &nbsp; Assess with GPT-4
                        </button>
                        <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                            <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                            <span className='text-sm'>OR</span>
                            <div className='w-full h-[1px] rounded-full bg-primary-light-2'></div>
                        </div>
                        <button className='border border-primary-light-2 rounded-md p-2 flex items-center justify-center'>
                            {/* <Image src={"/assets/icons/gpt.png"} alt='gpt' width={50} height={50}/> &nbsp; Assess with GPT-4 */}
                            <AssessAIIcon/> &nbsp; Assess with Assess AI
                        </button>


                    </div>

                </div>
            )}



        </>
    )
}

export default Responses
