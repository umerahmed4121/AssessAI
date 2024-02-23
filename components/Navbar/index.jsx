"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { getUserFromCookie } from '../apis/credentialSession';

const initialColor = {
    r: 15,
    g: 3,
    b: 23,
    a: 1
}
const finalColor = {
    //#271c2ee6
    r: 39,
    g: 28,
    b: 46,
    a: 0.9
}
const diffColor = {
    r: Math.abs(finalColor.r - initialColor.r),
    g: Math.abs(finalColor.g - initialColor.g),
    b: Math.abs(finalColor.b - initialColor.b),
    a: Math.abs(finalColor.a - initialColor.a)
}

const Navbar = ({ navLinks, dashboard }) => {

    const { data: session, status } = useSession();
    const [credentialSession, setCredentialSession] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const user = await getUserFromCookie()
            if (user) {
                setCredentialSession(user)
            }
        }
        getData()
    }, [])


    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };



    const BackgroundColor = () => {
        const [scrollPosition, setScrollPosition] = useState(0);
        const [viewportHeight, setViewportHeight] = useState(0);


        useEffect(() => {
            const handleScroll = () => {
                const currentPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const navbar = window.document.querySelector("#navbar");
                if (isMobileMenuOpen) {
                    navbar.style.backgroundColor = `rgba(${finalColor.r},${finalColor.g},${finalColor.b},${finalColor.a})`
                } else {
                    navbar.style.backgroundColor = `rgba(${initialColor.r},${initialColor.g},${initialColor.b},${initialColor.a})`
                    if (scrollPosition == 0) {
                        navbar.style.backgroundColor = `rgba(${initialColor.r},${initialColor.g},${initialColor.b},${initialColor.a})`
                    } else {
                        navbar.style.backgroundColor = `rgba(${scrollPosition >= viewportHeight ? finalColor.r : Math.round(initialColor.r + ((scrollPosition / viewportHeight) * diffColor.r))},${scrollPosition >= viewportHeight ? finalColor.g : Math.round(initialColor.g + ((scrollPosition / viewportHeight) * diffColor.g))},${scrollPosition >= viewportHeight ? finalColor.b : Math.round(initialColor.b + ((scrollPosition / viewportHeight) * diffColor.b))},${scrollPosition >= viewportHeight ? finalColor.a : (initialColor.a - ((scrollPosition / viewportHeight) * diffColor.a)).toFixed(2)})`
                    }
                }





                setScrollPosition(Math.round(currentPosition));
                setViewportHeight(windowHeight);


            };

            // Set up the event listener
            window.addEventListener('scroll', handleScroll);

            // Initial check for bottom on mount
            handleScroll();

            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [scrollPosition, isMobileMenuOpen]);

    };
    BackgroundColor();




    return (
        <motion.nav id='navbar' className="p-1 flex flex-row justify-center items-center fixed top-0 w-full h-[60px] my_blur">

            {(isMobileMenuOpen || loading) && (
                <div className='absolute top-[60px] left-0 right-0 w-screen h-screen bg-[#00000080] z-10'>

                </div>
            )}


            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Branding */}
                <Link href="/" className="flex flex-row gap-2 text-white text-xl font-bold">
                    <Image src="/assets/logo.png" width={30} height={30} alt='AssessAi' />
                    AssessAi
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-4">
                    {navLinks.map((link) => (
                        <motion.li
                            key={link.id}
                            whileHover={{
                                scale: 1.1,
                            }}
                            className="text-white hover:text-secondary-light cursor-pointer"
                            onClick={() => setLoading(true)}
                        >
                            <a href={link.href}>{link.text}</a>
                        </motion.li>
                    ))}

                </ul>



                <div className=' w-[100px] hidden md:flex md:flex-col'>
                    {(status === 'authenticated' && session) && (
                        <div
                            className="hidden md:flex md:justify-center"
                            onMouseEnter={() => setProfileMenuOpen(true)}
                            onMouseLeave={() => setTimeout(() => setProfileMenuOpen(false), 5000)}
                        >
                            <Image src={session.user.image} width={30} height={30} className='w-10 h-10 rounded-full cursor-pointer' />
                        </div>
                    )}

                    {credentialSession && (

                        <div
                            className="hidden md:flex md:justify-center"
                            onMouseEnter={() => setProfileMenuOpen(true)}
                            onMouseLeave={() => setTimeout(() => setProfileMenuOpen(false), 5000)}
                        >
                            {credentialSession.picture ? (
                                <Image
                                    src={credentialSession.picture}
                                    width={30} height={30}
                                    className='w-10 h-10 rounded-full cursor-pointer' />
                            ) : (
                                <Image
                                    src={"/assets/icons/avatar.svg"}
                                    width={30} height={30}
                                    className='w-10 h-10 rounded-full cursor-pointer p-1 bg-white' />
                            )}

                        </div>
                    )}

                    {!(status === 'authenticated' && session) && !credentialSession && (
                        <Link href='/auth/login' className="hidden md:flex md:justify-center">
                            Login
                        </Link>
                    )}




                    {isProfileMenuOpen && (
                        <div
                            className=' bg-primary-light  border border-primary-light-2 w-[100px] h-14 absolute translate-y-11 rounded-md flex flex-col p-1 gap-1 justify-center items-center'
                            onMouseLeave={() => setProfileMenuOpen(false)}
                        >
                            <Link href='/dashboard' className="text-white text-center"

                            >Goto Dashboard</Link>
                        </div>
                    )}


                </div>



                {/* Mobile Navigation Toggle Button */}
                <button
                    className="md:hidden text-white z-20"
                    onClick={toggleMobileMenu}
                >
                    <FaBars />
                </button>

                {/* Mobile Navigation */}

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.aside
                            initial={{ width: 0 }}
                            animate={{
                                width: '70%',
                            }}
                            exit={{
                                width: 0,
                                transition: { duration: 0.2 }
                            }}

                            className={`md:hidden w-[70%] h-screen absolute top-full right-0 bg-primary-light p-6 z-20`}
                        >
                            <ul className="flex flex-col items-end space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.id}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.1, delay: index * 0.1, ease: "easeInOut" }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.1 } }}
                                        className="text-white text-base py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Link href={link.href}>{link.text}</Link>
                                    </motion.li>
                                ))}

                                {/* <motion.span className='w-full h-0.5 bg-white' /> */}

                                {(status === 'authenticated' && session) && (
                                    <motion.li
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.1, delay: navLinks.length * 0.1, ease: "easeInOut" }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.1 } }}
                                        className="text-white text-base py-2"
                                        onClick={() => {setMobileMenuOpen(false); setLoading(true)}}
                                    >
                                        <Link href="/dashboard">Dashboard</Link>
                                    </motion.li>
                                )}

                                {credentialSession && (

                                    <motion.li
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.1, delay: navLinks.length * 0.1, ease: "easeInOut" }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.1 } }}
                                        className="text-white text-base py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Link href="/dashboard">Dashboard</Link>
                                    </motion.li>
                                )}

                            </ul>



                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* <Image src={"/assets/icons/google.svg"} width={25} height={25} className='rounded-full cursor-pointer' /> */}
            </div>
        </motion.nav>
    );
};

export default Navbar;
