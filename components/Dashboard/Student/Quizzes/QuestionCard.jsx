"use client"


import React from 'react'

const QuestionCard = ({ index, question, answer, onAnswerChange }) => {

    return (
        <div className='w-full bg-primary-light my-2 p-2 rounded-md border border-primary-light-2'>
            <div className='grid grid-cols-2 justify-items-end'>
                <div className='w-full text-xl p-2'>
                    Question no. {index + 1}
                </div>
            </div>

            <div className='bg-primary-light p-1 border border-primary-light-2 rounded-md focus:outline-none w-full text-white placeholder:italic'>
                {question}
            </div>
            <div className='w-full text-xl p-2'>
                Answer
            </div>
            <textarea
                type="text"
                rows={5}
                className='bg-primary-light p-1 border border-primary-light-2 rounded-md focus:outline-none w-full text-white placeholder:italic'
                placeholder='Add your answer here...'
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
            />

        </div>
    )
}



export default QuestionCard