import React from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateQuiz } from './api/quiz'
import { set } from 'mongoose'


const ResponseCard = ({ assessment, key , handleUpdateAssessment}) => {


    const [loading, setLoading] = useState(false)

    const [marks, setMarks] = useState(0)
    const [updatedAssessment, setUpdatedAssessment] = useState(assessment)

    const queryClient = useQueryClient();
    const updateQuizMutation = useMutation(updateQuiz, {
        onSuccess: () => {
            // Invalidates  cache and refetch
            queryClient.invalidateQueries("quizzes");
        },
    });


    return (
        <>
            <div className='w-full bg-primary-light border border-primary-light-2 rounded-md my-2 text-base text-justify'>

                <div className='w-full text-xl p-4 flex items-center justify-between'>

                    Question: {assessment?.question} &nbsp;
                    ({assessment?.totalMarks} marks)

                </div>
                <div className='w-full text-xl p-4'>
                    Answer: {assessment?.answer}
                </div>
                <div className='w-full p-4 '>
                    <div className='text-base'>
                        Responses:
                    </div>


                    {assessment?.responses?.map((response, index) => (

                        <div  key={index} className="w-full font-normal grid grid-cols-1  lg:grid-cols-[auto,20%] justify-items-center lg:justify-items-start gap-2">
                            <div className='w-full text-xl p-2 italic'>
                                {index + 1}.{" "}
                                {response?.answer}
                            </div>
                            <div className="w-full sm:w-[50%] lg:w-full p-2 border border-primary-light-2 rounded-md m-2 flex flex-col gap-2 ">
                                <div className="w-full">
                                    <div className="w-full text-center">
                                        Marks
                                    </div>
                                    {/* <button onClick={handleMarksChange}>He</button> */}
                                    <input type="number" 
                                    min="0"
                                    max={assessment?.totalMarks}                                    
                                    value={response?.obtainedMarks}
                                    onChange={(e) => { handleUpdateAssessment(assessment._id,response._id,e.target.value )}}
                                    className="w-full text-center bg-transparent text-white border border-primary-light-2 rounded-md px-4 py-2 focus:outline-none"
                                    />
                                </div>
                                <div className="w-full">
                                    <div className="w-full text-center">AI&apos;s Remarks:</div>
                                    <div className="w-full text-center px-4 py-2 border border-primary-light-2 rounded-md">{response.aiRemarks}</div>
                                </div>

                            </div>
                        </div>

                    ))}






                </div>



            </div>

        </>
    )
}

export default ResponseCard