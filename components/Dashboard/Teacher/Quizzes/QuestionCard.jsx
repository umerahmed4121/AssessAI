"use client"


import React, { useEffect } from 'react'
import { useState } from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri";

const QuestionCard = ({index, question, answer, totalMarks, onMarksChange, onQuestionChange, onAnswerChange, onDelete  }) => {

    return (
        <div className='w-full bg-primary-light my-2 p-2 rounded-md border border-primary-light-2'>
            <div className='grid grid-cols-[auto,auto,auto] justify-between items-center'>
                <div className='text-xl p-2'>
                    Question
                </div>
                <div className='w-20  p-2 flex flex-row justify-center items-center gap-2 h-fit'>
                    <div>Marks</div>
                    <input
                    className='bg-primary-light w-20 p-1 border border-primary-light-2 rounded-md focus:outline-none text-white placeholder:italic text-center'
                    type="number"
                    value={totalMarks}
                    min={1}
                    onChange={(e) => onMarksChange(parseInt(e.target.value))}
                    />
                </div>
                <div className="">
                    <button
                        className='bg-secondary p-2 m-1 rounded-md '
                        onClick={() => onDelete(index)}
                    >
                        <RiDeleteBin2Fill />
                    </button>
                </div>
            </div>

            <textarea
                type="text"
                rows={5}
                className='bg-primary-light p-1 border border-primary-light-2 rounded-md focus:outline-none w-full text-white placeholder:italic'
                placeholder='Add your question here...'
                value={question}
                onChange={(e) => onQuestionChange(e.target.value)}
            />
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