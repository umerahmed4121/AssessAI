import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import { getQuizForResponse, submitResponse } from './api/quiz'
import QuestionCard from './QuestionCard'
import { useParams } from 'next/navigation'



const QuizResponse = ({ token }) => {


    const queryClient = useQueryClient();
    // Authorization
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { data, isLoading, isError } = useQuery("quizForResponse", getQuizForResponse.bind(this, token))

    console.log(data);

    const [response, setResponse] = useState(null)
    const [isAlreadyResponded, setIsAlreadyResponded] = useState(false)

    const handleAnswerChange = (index, field, value) => {
        const updatedResponse = { ...response }
        updatedResponse.assessments[index][field] = value;
        setResponse(updatedResponse)
        submitResponseMutation.mutate(response)
    };



    useEffect(() => {
        if (!isLoading) {
            if (data) {
                if (data.isResponded) {
                    setIsAlreadyResponded(true)
                    setLoading(false)
                } else {
                    setResponse({
                        participant_id: data.participant_id,
                        quiz_id: data.quiz.id,
                        title: data.quiz.title,
                        description: data.quiz.description,
                        assessments: data.quiz.assessments
                    })
                    setLoading(false)
                }

            }
            else {
                setIsAlreadyResponded(true)
                setLoading(false)
            }
        }
    }, [isLoading])

    const [contentHeight, setContentHeight] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)
    const [smallContent, setSmallContent] = useState(false)
    const [warning, setWarning] = useState(false)

    useEffect(() => {

        const content = document.querySelector("#contentContainer");
        setContentHeight(content.clientHeight)

        const screenHeight = window.innerHeight;
        setScreenHeight(screenHeight)

        if (contentHeight < screenHeight) {
            setSmallContent(true)
        } else {
            setSmallContent(false)
        }

        content.addEventListener('mouseleave', () => {
            setWarning(true)

        })
        content.addEventListener('mouseenter', () => {
            setSeconds(9)
            setWarning(false)
        })
    }, [loading, contentHeight, screenHeight])

    // --------------------------

    const [seconds, setSeconds] = useState(9); // Start from 5 seconds
    const intervalRef = useRef(null);

    useEffect(() => {
        if (warning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        }

        // Cleanup function
        return () => clearInterval(intervalRef.current);
    }, [warning]);

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(intervalRef.current);
            // setLoading(true)
            // router.replace("/dashboard/student/quizzes")
        }
    }, [seconds]);
    // -----------------------

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            // Enable fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
                document.documentElement.msRequestFullscreen();
            }
        } else {
            // Disable fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }

        setIsFullScreen(!isFullScreen);
    };

    // -------------------------------------------------

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        return time.toLocaleTimeString();
    };

    // -----------------------------------------------------






    const submitResponseMutation = useMutation(submitResponse, {
        onSuccess: () => {
            // Invalidates  cache and refetch
            queryClient.invalidateQueries("quizzes");
        },
    });

    // Quiz response
    const handleResponseSubmit = () => {
        setLoading(true)
        submitResponseMutation.mutate(response)
        setResponse(null)
        router.push('/dashboard/student/quizzes')
    }



    return (
        <div id='contentContainer' className={`w-full grid  ${smallContent ? "h-screen" : ""}`}>

            <Loader visible={loading} />
            {(warning && !isAlreadyResponded) && (
                <div className='fixed top-0 left-0 w-full h-screen bg-[#ffffff80] my_blur flex justify-center items-center z-10 '>
                    <div className='text-red-700 font-bold text-3xl sm:text-5xl p-2 flex flex-col gap-2 text-center'>

                        <div className='text-5xl sm:text-8xl p-8'>
                            Returning in 00:0{seconds}
                        </div>
                        <div>
                            DON&apos;T GO ANYWHERE!
                        </div>
                        <div className='font-normal'>
                            Your activity is being monitored
                        </div>


                    </div>
                </div>
            )}
            {(
                <div className='w-full'>

                    {/* Header */}
                    <div className='fixed top-0 left-0 h-16 sm:h-32 w-full flex flex-row gap-2 justify-between items-center py-4 px-8 sm:px-16 bg-primary-light border-b border-primary-light-2'>

                        <div className='text-lg sm:text-xl p-1 font-sans'>

                            {formatTime(currentTime)}

                        </div>

                        {response !== null && (
                            <div>
                                <div
                                    type="text"
                                    className='m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full text-lg sm:text-3xl text-center '
                                >

                                    {response.title.length > 20 ? response.title.substring(0, 20) + "..." : response.title}

                                </div>
                                <div
                                    type="text"
                                    className='hidden sm:flex  m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full sm:text-2xl text-center text-white italic'
                                >
                                    {response.description.length > 30 ? response.description.substring(0, 30) + "..." : response.description}
                                </div>

                            </div>
                        )}




                        <div className='hidden sm:flex rounded-md bg-primary-light border border-primary-light-2 p-2 hover:'>
                            <button onClick={toggleFullScreen}>
                                {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
                            </button>

                        </div>

                    </div>

                    <div className='grid p-4 pt-20 sm:pt-36 w-full sm:w-1/2 m-auto justify-items-center'>

                        {isAlreadyResponded ? (
                            <div className='grid gap-8 justify-center justify-items-center p-4 rounded-md text-3xl sm:text-3xl  text-center bg-primary-light border border-primary-light-2'>
                                <div>
                                    You have already already submitted a response
                                </div>
                                <button onClick={() => {
                                    setLoading(true)
                                    router.replace("/dashboard/student")
                                }} className='bg-secondary w-fit px-4 py-2 rounded-md'>
                                    Back to dashboard
                                </button>
                            </div>
                        ) : (
                            <>
                                {response !== null && (
                                    <>
                                        {response.assessments.map((assessment, index) => (
                                            <QuestionCard
                                                key={index}
                                                index={index}
                                                question={assessment.question}
                                                answer={assessment.answer}
                                                onAnswerChange={(value) => handleAnswerChange(index, 'answer', value)}
                                            />
                                        ))}
                                        <button
                                            className='bg-secondary p-2 my-8 rounded-md w-1/4 self-center '
                                            onClick={handleResponseSubmit}
                                        >
                                            Submit
                                        </button>

                                    </>
                                )}

                            </>
                        )}



                    </div>

                </div>
            )}
        </div>

    )
}

export default QuizResponse