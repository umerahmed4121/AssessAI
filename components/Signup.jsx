"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { FaArrowLeft } from 'react-icons/fa';
import { GoogleIcon } from '@/icons';
import { FaApple } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { hashPassword, verifyPassword } from '@/utils/password';
import { isValidDate, toDate } from '@/utils/date';


const Signup = () => {

    const router = useRouter();

    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            name: '',
            birthday: '',
        }
    )

    const [submitting, setSubmitting] = useState(false)
    const [continueWithEmail, setContinueWithEmail] = useState(false);
    const [continueSignUp, setContinueSignUp] = useState(false)

    const passwordRef = useRef(null);
    const nameRef = useRef(null);



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

        setSubmitting(true)
        const hashedPassword = await hashPassword(formData.password);
        const parsedDate = toDate(formData.birthday);

        try {
            const res = await fetch('/api/auth/email/signup', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: formData.email,
                        password: hashedPassword,
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
                router.push('/')

            } else {
                toast("Something went wrong!", {
                    type: 'error'
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }

    };

    const handleGoogleSignup = async () => {
        // Perform Google signup logic here
        // You can use the next-auth library to handle the Google signup process
        await signIn('google');
    };

    return (
        <div className="flex flex-col m-auto px-[8vw] sm:max-w-sm sm:px-10 items-center justify-center mt-[10vh]">
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
            {!continueSignUp && (
                <form onSubmit={handleContinueWithEmail} className='flex flex-col justify-center w-full'>
                    <motion.h1 className="text-center text-3xl font-bold pt-10 pb-6">Create your account</motion.h1>
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form_input"
                    />


                    {!continueWithEmail && (
                        <button
                            type='submit'
                            className='form_button mt-6'
                        >Continue</button>
                    )}
                </form>
            )}



            {!continueWithEmail && (
                <>
                    <span className='text-sm mt-4'>Already have an account?
                        <Link className='pl-2 text-secondary' href='/auth/login'>Log in</Link>
                    </span>

                    <div className='flex flex-row justify-center items-center gap-2 w-full py-6 px-1'>
                        <div className='w-full h-[1px] rounded-full bg-white'></div>
                        <span className='text-sm'>OR</span>
                        <div className='w-full h-[1px] rounded-full bg-white'></div>
                    </div>
                    {/* Continue with Google */}
                    {/* https://youtu.be/wm5gMKuwSYk?t=4842 https://youtu.be/wm5gMKuwSYk */}
                    <motion.button
                        onClick={handleGoogleSignup}
                        className="form_button_2"
                    >
                        <span className='flex flex-row align-center justify-center gap-2'><GoogleIcon className='self-center' />Continue with Google</span>

                    </motion.button>

                    {/* Continue with Apple */}
                    <motion.button
                        onClick={handleGoogleSignup}
                        className="form_button_2 mt-2"
                    >
                        <span className='flex flex-row align-center justify-center gap-2'><FaApple className='self-center w-5 h-5' />Continue with Apple</span>

                    </motion.button>
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
