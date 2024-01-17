"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ColorRing } from 'react-loader-spinner'
import { colors } from '@/styles'

const initialColor = {
    r: 15,
    g: 3,
    b: 23,
    a: 1
}
const finalColor = {
    r: 39,
    g: 28,
    b: 46,
    a: 1
}
const diffColor = {
    r: Math.abs(finalColor.r - initialColor.r),
    g: Math.abs(finalColor.g - initialColor.g),
    b: Math.abs(finalColor.b - initialColor.b),
    a: Math.abs(finalColor.a - initialColor.a)
}

const Navbar = ({ navLinks, dashboard }) => {

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {

        }

    }, [isMobileMenuOpen])


    const BackgroundColor = () => {
        const [scrollPosition, setScrollPosition] = useState(0);
        const [viewportHeight, setViewportHeight] = useState(0);


        useEffect(() => {
            const handleScroll = () => {
                const currentPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const navbar = document.querySelector("#navbar");
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
        <motion.nav id='navbar' className={`p-4 fixed top-0 w-full`}>

            {(isMobileMenuOpen || loading) && (
                <div className='absolute top-[70%] left-0 right-0 w-screen h-screen bg-transparent backdrop-blur z-10'>
                    {loading && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <ColorRing
                        visible={loading}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[colors.secondaryLight, colors.secondary, colors.secondaryDark, colors.secondaryDark2, colors.secondaryDark3, colors.secondaryDark4]}
                        
                    />
                        </div>
                        
                    )}
                </div>
            )}


            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Branding */}
                <a href="/" className="text-white text-xl font-bold">
                    AssessAI
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-4">
                    {navLinks.map((link) => (
                        <motion.li
                            key={link.id}
                            whileHover={{
                                scale: 1.1,
                            }}
                            className="text-white hover:text-secondary-light cursor-pointer"
                        >
                            <a href={link.href}>{link.text}</a>
                        </motion.li>
                    ))}
                    {dashboard && (
                        <motion.li
                            key={"signout-desktop"}
                            whileHover={{
                                scale: 1.1,
                            }}
                            className="text-white hover:text-secondary-light cursor-pointer"
                            onClick={() => {
                                setLoading(true)
                                setTimeout(() => {
                                    signOut({ callbackUrl: 'http://localhost:3000/' })
                                }, 2000)
                                
                            }}>Sign out</motion.li>
                    )}
                </ul>


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
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}

                            className={`md:hidden w-[70%] h-screen absolute top-full right-0 bg-primary-light p-6 z-20`}
                        >
                            <ul className="flex flex-col items-end space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: index * 0.25, ease: "easeInOut" }}

                                        key={link.id}
                                        whileHover={{ color: '#ff9900' }}
                                        className="text-white text-base py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Link href={link.href}>{link.text}</Link>
                                    </motion.li>
                                ))}

                                {/* <motion.span className='w-full h-0.5 bg-white' /> */}

                                {dashboard && (
                                    <motion.li
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 },
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: navLinks.length * 0.25, ease: "easeInOut" }}

                                        key={"login"}
                                        whileHover={{ color: '#ff9900' }}
                                        className="text-white text-right text-base py-2 cursor-pointer"
                                        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Sign out</motion.li>
                                )}

                                {!dashboard && (
                                    <motion.div className='absolute bottom-[20%]'>
                                        <motion.li
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 },
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: navLinks.length * 0.25, ease: "easeInOut" }}

                                            key={"login"}
                                            whileHover={{ color: '#ff9900' }}
                                            className="text-white text-right text-base py-2 cursor-pointer"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Link href='/auth/login' >Log in</Link>


                                        </motion.li>
                                        <motion.li
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 },
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: (navLinks.length + 1) * 0.25, ease: "easeInOut" }}

                                            key={'signup'}
                                            whileHover={{ color: '#ff9900' }}
                                            className="text-white text-base py-2 cursor-pointer"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Link href='/auth/signup' >Sign up</Link>
                                        </motion.li>
                                    </motion.div>
                                )}



                            </ul>



                        </motion.div>
                    )}
                </AnimatePresence>

                {/* <Image src={"/assets/icons/google.svg"} width={25} height={25} className='rounded-full cursor-pointer' /> */}
            </div>
        </motion.nav>
    );
};

export default Navbar;
