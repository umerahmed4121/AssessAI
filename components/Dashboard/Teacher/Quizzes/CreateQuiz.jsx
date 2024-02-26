"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import QuestionCard from './QuestionCard'
import { MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Participants from './Participants';
import { useMutation, useQueryClient } from 'react-query';
import { createQuiz } from './api/quiz'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'
import ToggleButton from '@/components/Utils/ToggleButton'
import { set } from 'mongoose'
import { getUserFromCookie } from '@/components/apis/credentialSession'


const Create = () => {

  const queryClient = useQueryClient();
  const [user_id, setUser_id] = useState(null)
  const { data: session, status:sessionStatus } = useSession()

  useEffect(() => {
    queryClient.invalidateQueries("participants");
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


  const [quiz, setQuiz] = useState({
    creator_id: null,
    title: 'Quiz title',
    description: 'Quiz description',
    assessments: [],
    participants: [],
    isAcceptingResponses: false,
  });

  console.log(quiz);


  useEffect(() => {
    if (user_id !== null) {
      setQuiz({ ...quiz, creator_id: user_id })

    }
  }, [user_id])

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [assessments, setAssessments] = useState([{ totalMarks: 5, question: '', answer: '' }]);
  const [participants, setParticipants] = useState([])
  const [showParticipants, setShowParticipants] = useState(false);


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

  const toggleShowParticipants = () => {
    setShowParticipants(!showParticipants);
  }

  return (
    <div className='grid grid-cols-1 2xl:grid-cols-[60%,38%] 2xl:gap-[2%] justify-center 2xl:justify-normal  w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-full'>
      <Loader visible={loading} dashboard={true} />

      <div className={`fixed border border-primary-light-2 bg-primary-light ${showParticipants ? "w-[100%] sm:w-[70%]" : "hidden w-0 opacity-0"} h-screen right-0 top-[60px] transition-all duration-500`}>
        <div className='w-full bg-primary-light py-4 flex flex-col justify-center rounded-md h-[calc(100vh-113px)]'>
          <div className='flex flex-row justify-between gap-2 w-full py-1 px-4'>
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


      <div className='w-full  flex flex-col '>
        <div className="fixed bottom-[5%] right-[5%] flex gap-4">
          <button
            className='bg-secondary w-10 h-10 sm:w-14 sm:h-14  rounded-md flex 2xl:hidden justify-center items-center transition duration-500 delay-200 hover:scale-105 '
            onClick={() => toggleShowParticipants()}
          >
            <BsThreeDotsVertical className='text-white text-3xl' />

          </button>
          <button
            className='bg-secondary w-10 h-10 sm:w-14 sm:h-14  rounded-full flex justify-center items-center transition duration-500 delay-200 hover:scale-105 '
            onClick={() => handleQuizCreation()}
          >
            <MdSend className='text-white text-3xl' />

          </button>
        </div>

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
      <div className='w-full bg-primary-light hidden 2xl:py-4 2xl:flex 2xl:flex-col justify-center border border-primary-light-2 rounded-md h-[calc(100vh-113px)]'>
        <div className='flex flex-row justify-between gap-2 w-full py-1 px-4'>
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