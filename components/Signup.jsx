"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { signIn, useSession, getProviders } from "next-auth/react"
import { motion } from 'framer-motion';
import Link from 'next/link';

import { FaArrowLeft } from 'react-icons/fa';
import { GoogleIcon } from '@/icons';
import { FaGithub } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from "react-icons/fa";

import { hashPassword, verifyPassword } from '@/utils/password';
import { isValidDate, toDate } from '@/utils/date';

import { colors } from '@/styles';
import Loader from './Loader';
import { set } from 'mongoose';
import Image from 'next/image';

const Signup = () => {

    const router = useRouter();
    const { data: session, status } = useSession();
    const [providers, setProviders] = useState(null)

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            role: 'student',
            name: '',
            birthday: '',
        }
    )

    const [loading, setLoading] = useState(false)
    const [continueWithEmail, setContinueWithEmail] = useState(false);
    const [continueSignUp, setContinueSignUp] = useState(false)


    const passwordRef = useRef(null);
    const nameRef = useRef(null);

    useEffect(() => {

        const setMyProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }
        setMyProviders()

    }, [])


    useEffect(() => {
        if (passwordRef.current) {
            passwordRef.current.focus()
        }
    }, [continueWithEmail]);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus()
        }
    }, [continueSignUp]);



    const handleContinueWithEmail = (e) => {
        e.preventDefault()
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            setContinueWithEmail(true)
        } else {
            toast("You have entered an invalid email address!", {
                type: 'error'
            })
        }

    }

    const handleContinueSignUp = (e) => {
        e.preventDefault()
        if (formData.password.length >= 8) {
            setContinueSignUp(true)

        } else {
            toast("Password must be at least 8 characters long", {
                type: 'error'
            })
        }

    }

    const handleSignUp = async (e) => {

        e.preventDefault()


        if (formData.name.length < 3) {
            toast("Name must be at least 3 characters long", {
                type: 'error'
            })
            return
        } else if (!isValidDate(formData.birthday)) {
            toast("Provide a valid date", {
                type: 'error'
            })
            return
        }
        setLoading(true)
        const hashedPassword = await hashPassword(formData.password);
        const parsedDate = toDate(formData.birthday);

        try {
            const res = await fetch('/api/auth/email/signup', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: formData.email,
                        password: hashedPassword,
                        role: formData.role,
                        name: formData.name,
                        birthday: parsedDate
                    }
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                toast("Account created successfully!", {
                    type: 'success'
                })
                setFormData({
                    email: '',
                    password: '',
                    role: 'student',
                    name: '',
                    birthday: '',
                })
                const data = await res.json()
                console.log(data);
                if (data.role === 'teacher') {
                    router.push('/dashboard/teacher')
                } else {
                    router.push('/dashboard/student')
                }


            } else if (res.status === 409) {
                toast("Email already exist", {
                    type: 'error'
                })
                setLoading(false)
            } else {
                toast("Something went wrong!", {
                    type: 'error'
                })
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong!", {
                type: 'error'
            })
            setLoading(false)
        }

    };


    return (
        <div className="form_container">
            <Loader visible={loading} />
            {!continueWithEmail || continueSignUp ?
                <FaArrowLeft className="invisible text-2xl" /> :
                <FaArrowLeft className="self-start text-2xl" onClick={() => setContinueWithEmail(false)} />
            }
            <ToastContainer
                position="top-center"
                autoClose={2000}
                limit={1}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {!continueSignUp && ( // Initial form
                <form onSubmit={handleContinueWithEmail} className='flex flex-col justify-center w-full'>
                    <motion.div className="w-full flex items-center justify-center p-1">
                        <Image src={"/assets/logo.png"} alt="AssessAI" width={80} height={80} />
                    </motion.div>
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}

                        className="text-center text-3xl font-bold py-6"
                    >
                        Create your account
                    </motion.h1>
                    <motion.input

                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
                        required
                        autoComplete="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form_input mt-3"
                    />


                    {!continueWithEmail && (
                        <motion.button
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.75, ease: "easeInOut" }}

                            type='submit'
                            className='form_button mt-6'
                        >Continue</motion.button>
                    )}
                </form>
            )}



            {!continueWithEmail && (
                <>
                    <motion.span
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
                        className='text-sm mt-4'>Already have an account?
                        <Link className='pl-2 text-secondary' href='/auth/login'>Log in</Link>
                    </motion.span>

                    {/* Continue with Google */}
                    {/* https://youtu.be/wm5gMKuwSYk?t=4842 https://youtu.be/wm5gMKuwSYk */}
                    {providers &&
                        Object.values(providers).map((provider) => {
                            if (provider.id === 'google') {
                                return (
                                    <>
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 },
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: 1.25, ease: "easeInOut" }}
                                            className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                                            <div className='w-full h-[1px] rounded-full bg-white'></div>
                                            <span className='text-sm'>OR</span>
                                            <div className='w-full h-[1px] rounded-full bg-white'></div>
                                        </motion.div>

                                        <motion.button
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 },
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}

                                            type="button"
                                            key={provider.name}
                                            onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/dashboard' })}
                                            className="form_button_2"
                                        >
                                            <span className='flex flex-row align-center justify-center gap-2'><GoogleIcon className='self-center' />Continue with Google</span>

                                        </motion.button>
                                    </>

                                )
                            } else if (provider.id === 'github') {
                                return (
                                    <motion.button
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 1.75, ease: "easeInOut" }}

                                        type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/dashboard' })}
                                        className="form_button_2 mt-3"
                                    >
                                        <span className='flex flex-row align-center justify-center gap-2'><FaGithub className='self-center w-5 h-5' />Continue with Github</span>

                                    </motion.button>
                                )
                            }

                        })
                    }
                </>

            )}



            {!continueSignUp && continueWithEmail && (
                <form onSubmit={handleContinueSignUp} className='flex flex-col justify-center w-full gap-[2vh]'>
                    <input
                        required
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="form_input mt-3"
                    />
                    <motion.button
                        type='submit'
                        className='form_button mt-6'
                    >Continue
                    </motion.button>

                </form>
            )}

            {continueSignUp && (
                <form className='flex flex-col justify-center w-full gap-[2vh]'>
                    <motion.h1 className="text-center text-3xl font-bold pb-12">Tell us about you</motion.h1>

                    <div className='flex flex-row justify-center gap-3 py-1'>
                        <button
                            type='button'
                            className={`border ${formData.role === 'student' ?
                                'border-secondary text-secondary' :
                                'border-white text-white'}
                        w-full py-2 rounded`}
                            onClick={() => setFormData({ ...formData, role: 'student' })}
                        >
                            <span className='flex flex-row justify-center items-center gap-2'>Student {formData.role === "student" && (<FaCheckCircle />)}</span>
                        </button>
                        <button
                            type='button'
                            className={`border ${formData.role === 'teacher' ?
                                'border-secondary text-secondary' :
                                'border-white text-white'}
                        w-full py-2 rounded`}
                            onClick={() => setFormData({ ...formData, role: 'teacher' })}
                        >
                            <span className='flex flex-row justify-center items-center gap-2'>Teacher {formData.role === "teacher" && (<FaCheckCircle />)}</span>
                        </button>

                    </div>
                    <input
                        required
                        ref={nameRef}
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form_input"
                    />

                    <input
                        required
                        id='birthday'
                        type="text"
                        placeholder="Birthday"
                        onFocus={() => { document.querySelector('#birthday').placeholder = 'DD/MM/YYYY' }}
                        onBlur={() => { document.querySelector('#birthday').placeholder = 'Birthday' }}
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        className="form_input"
                    />

                    <div className="text-sm text-center text-wrap mt-8">
                        By clicking &quot;Agree&quot;, you agree to our
                        <Link href="#" target="_blank" className='px-1 underline text-secondary' >Terms</Link>
                        and have read our
                        <Link href="#" target="_blank" className='px-1 underline text-secondary'>
                            Privacy Policy
                        </Link>
                    </div>


                    <motion.button
                        onClick={handleSignUp}
                        className='form_button mt-6'
                    >Agree</motion.button>



                </form>
            )}






        </div>
    );
};

export default Signup;
