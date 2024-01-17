"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react";


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

    const router = useRouter()
    const { data: session, status } = useSession()
    const [ credentialsSession, setCredentialsSession] = useState(null)

    useEffect(() => {
        const getUserFromCookie = async () => {
            try {
                const res = await fetch('/api/auth/email/jwt', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                if (res.status === 401) {
                    router.push('/')
                } else if (res.status === 200) {
                    const data = await res.json()
                    setCredentialsSession(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getUserFromCookie()
    }, [])

    
    if (status === "authenticated" || credentialsSession) {
        return (
            <div>
                <Navbar dashboard={true} navLinks={navLinks} />
                <h1>Dashboard</h1>
            </div>
        )
    }



}

export default Page