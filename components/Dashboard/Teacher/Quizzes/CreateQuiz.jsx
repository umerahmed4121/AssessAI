"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import QuestionCard from './QuestionCard'
import { MdSend } from "react-icons/md";
import Participants from './Participants';
import { useMutation, useQueryClient } from 'react-query';
import { createQuiz } from './api/quiz'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import ToggleButton from '@/components/Utils/ToggleButton'


const Create = () => {

  const { data: session, status } = useSession()


  const [quiz, setQuiz] = useState({
    creator_id: null,
    title: 'Quiz title',
    description: 'Quiz description',
    assessments: [],
    participants: [],
    isAcceptingResponses: false,
  });

  

  useEffect(() => {
    if (session) {
      setQuiz({ ...quiz, creator_id: session.user.id })

    }
  }, [session])

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [assessments, setAssessments] = useState([{ totalMarks: 5, question: '', answer: '' }]);
  const [participants, setParticipants] = useState([])

  const queryClient = useQueryClient();

  const createQuizMutation = useMutation(createQuiz, {
    onSuccess: () => {
      // Invalidates  cache and refetch
      queryClient.invalidateQueries("quizzes");
    },
  });

  const handleAddQuestion = () => {
    setAssessments([...assessments, { totalMarks: 5, question: '', answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedAssessments = [...assessments];
    updatedAssessments[index][field] = value;
    setAssessments(updatedAssessments);
    setQuiz({ ...quiz, assessments: updatedAssessments });
  };

  const handleParticipantsChange = (value) => {
    setParticipants(value);
    setQuiz({ ...quiz, participants: value });
    console.log(quiz);
  }

  const handleDeleteQuestion = (index) => {
    const updatedAssessments = [...assessments];
    updatedAssessments.splice(index, 1);
    setAssessments(updatedAssessments);
  };



  const handleQuizCreation = () => {

    createQuizMutation.mutate(quiz);
    setLoading(true);
    router.push('/dashboard/teacher/quizzes');
    console.log(quiz);


  }

  return (
    <div className='grid sm:grid-cols-[60%,38%] gap-[2%]  w-full'>
      <Loader visible={loading} dashboard={true} />
      <div className='w-full flex flex-col '>
        <button
          className='bg-secondary w-10 h-10 sm:w-14 sm:h-14 fixed bottom-10 right-10 rounded-full flex justify-center items-center transition duration-500 delay-200 hover:scale-125 '
          onClick={() => handleQuizCreation()}
        >
          <MdSend className='text-white text-3xl' />

        </button>
        <input
          type="text"
          className='bg-primary m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full text-3xl text-center '
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
        <input
          type="text"
          className='bg-primary m-1 p-1 focus:border-b-2 border-primary-light focus:outline-none w-full text-2xl text-center text-white italic'
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />

        {assessments.map((assessment, index) => (
          <QuestionCard
            key={index}
            index={index}
            totalMarks={assessment.totalMarks}
            question={assessment.question}
            answer={assessment.answer}
            onMarksChange={(value) => handleQuestionChange(index, 'totalMarks', value)}
            onQuestionChange={(value) => handleQuestionChange(index, 'question', value)}
            onAnswerChange={(value) => handleQuestionChange(index, 'answer', value)}
            onDelete={handleDeleteQuestion}
          />
        ))}
        <button
          className='bg-secondary p-2 m-1 rounded-md w-1/4 self-center '
          onClick={handleAddQuestion}
        >
          Add Question
        </button>

      </div>
      <div className='bg-primary-light hidden sm:flex sm:flex-col  border border-primary-light-2 rounded-md h-[calc(100vh-113px)]'>
        <div className='flex flex-row justify-between items-center gap-2 w-full py-1 px-4'>
          <h1 className='text-center text-xl py-2'>Participants</h1>
          <div className='flex flex-row justify-center items-center gap-2'>
            <div >
              Responses
            </div>
  
            <ToggleButton
              enable={quiz.isAcceptingResponses}
              onChange={() => setQuiz({ ...quiz, isAcceptingResponses: !quiz.isAcceptingResponses })}
              className={"w-16 h-8"}
              circleClassName={"w-6 h-6"}
            />

            

          </div>

        </div>


        <Participants
          participants={participants}
          onParticipantsChange={(value) => handleParticipantsChange(value)}
        />
      </div>
    </div>
  )
}

export default Create