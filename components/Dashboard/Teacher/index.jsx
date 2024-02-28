import React from 'react'
import Link from 'next/link'

const TeacherDashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-128px)] border border-primary-light-2 rounded-md p-4 lg:p-8">
      <h1 className="text-2xl lg:text-5xl font-bold text-primary-dark-1">Dashboard</h1>
      <div className="bg-primary-light border border-primary-light-2 rounded-md p-4 my-4  ">
        <p className="text-lg lg:text-3xl">Welcome to your dashboard!</p>
        <p className="text-base lg:text-xl px-4 py-2">Get started by exploring your quizzes here</p>
        <div className="w-full flex items-center justify-center pt-8 pb-4">
          <button className="px-4 py-2 text-white lg:text-2xl bg-secondary rounded-md">
            <Link href="teacher/quizzes">
              Quizzes
            </Link>
          </button>
        </div>
        <div className="hidden w-full p-4 lg:flex flex-col justify-center">
          <ul className="w-full flex justify-center gap-2">
            <li>Assignments |</li>
            <li>Gradebook |</li>
            <li>AI Quizzes |</li>
            <li>Groups |</li>
            <li>Setting |</li>
            <li>Help & Support</li>
          </ul>
          <p className="text-center">Coming soon...</p>
        </div>


      </div>


    </div>
  )
}

export default TeacherDashboard