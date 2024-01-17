"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

import { motion } from "framer-motion"

import { signIn, signOut, useSession, getProviders } from "next-auth/react"

import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import { GoogleIcon } from '@/icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';

import { hashPassword, verifyPassword } from '@/utils/password';

import { colors } from '@/styles';

const Login = () => {
    const router = useRouter()
    const { data: session } = useSession()


    const [providers, setProviders] = useState(null)

    useEffect(() => {

        const setMyProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }
        setMyProviders()

    }, [])

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [submitting, setSubmitting] = useState(false)
    const [continueWithEmail, setContinueWithEmail] = useState(false)

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

    const handleLogin = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const { email, password } = formData
        const hashedPassword = await hashPassword(password)
        try {
            const res = await fetch('/api/auth/email/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: hashedPassword
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 404) {
                toast("User not found!", {
                    type: 'error'
                })
                setSubmitting(false)
                return
            } else if (res.status === 401) {
                toast("Incorrect password!", {
                    type: 'error'
                })
                setSubmitting(false)
                return
            } else if (res.status === 200) {
                const data = await res.json()

                console.log(data);
                toast("Login successful!", {
                    type: 'success'
                })
                setSubmitting(false)
                setTimeout(() => {
                    router.push('/')
                }, 2000);

            }

        } catch (error) {
            toast(error, {
                type: 'error'
            })
        } finally {
            setSubmitting(false)
        }
    }

    const handleGoogleSignup = async (e) => {
        console.log(formData);
    }

    return (
        <div className="form_container">
            {!continueWithEmail ?
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

            <motion.h1
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}

                className="text-center text-3xl font-bold pt-10 pb-6"
            >
                Welcome back
            </motion.h1>


            <form onSubmit={handleContinueWithEmail} className="w-full flex flex-col justify-center items-center">
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
                    className="form_input"
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
                        className='text-sm mt-4'>Don&apos;t have an account?
                        <Link className='pl-2 text-secondary' href='/auth/signup'>Sign up</Link>
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
                                        onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
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



            {continueWithEmail && (
                <form className="w-full flex flex-col">
                    <motion.input
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}

                        required
                        type="password"
                        placeholder="Password"
                        autoCapitalize="none"
                        autoFocus
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="form_input mt-2.5"
                    />
                    <div className="mt-4"><Link className='text-secondary' href='/'>Forgot password?</Link></div>


                    {submitting ? (
                        <span className='self-center'>
                            <ColorRing
                                visible={submitting}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={[colors.secondaryLight, colors.secondary, colors.secondaryDark, colors.secondaryDark2, colors.secondaryDark3, colors.secondaryDark4]}
                            />
                        </span>

                    ) : (
                        <button
                            onClick={handleLogin}
                            className='form_button mt-6'
                        >Continue</button>
                    )}

                </form>
            )}

        </div>
    )

}

export default Login;