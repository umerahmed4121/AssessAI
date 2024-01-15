"use client";
import { redirect } from "next/navigation";
import { signOut,useSession } from "next-auth/react"
import  Navbar  from "@/components/Navbar"

const navLinks = [
    { id: 1, text: 'Dashboard', href: '/dashboard' },
    { id: 2, text: 'Quizzes', href: '/dashboard/quizzes' },
    { id: 3, text: 'Assignments', href: '/dashboard/assignments' },
    { id: 4, text: 'Gradebook', href: '/dashboard/gradebook' },
    { id: 5, text: 'Students', href: '/dashboard/students' },
    { id: 6, text: 'Settings', href: '/dashboard/settings' },
    { id: 6, text: 'Help & Support', href: '/help-support' },
  ];

const Page = () => {

    const { data: session } = useSession()

    if (!session?.user) {
        redirect('/')
    }

    return (
        <>
        {session?.user && (
            <div>
                <Navbar dashboard={true} navLinks={navLinks}/>
                <h1>Dashboard</h1>
            </div>
        )}
        
        </>
    )
}

export default Page