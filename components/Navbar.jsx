"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    a: 0.84
}

const diffColor = {
    r: Math.abs(finalColor.r - initialColor.r),
    g: Math.abs(finalColor.g - initialColor.g),
    b: Math.abs(finalColor.b - initialColor.b),
    a: Math.abs(finalColor.a - initialColor.a)
}

const navLinks = [
    { id: 1, text: 'Home', href: '/' },
    { id: 2, text: 'About', href: '/about' },
    { id: 3, text: 'Services', href: '/services' },
    { id: 4, text: 'Contact', href: '/contact' },
];

const Navbar = () => {

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                const navbar = document.querySelector("#navbar");
                navbar.style.backgroundColor =`rgba(${scrollPosition >= viewportHeight ? finalColor.r : Math.round(initialColor.r + ((scrollPosition / viewportHeight) * diffColor.r))},${scrollPosition >= viewportHeight ? finalColor.g : Math.round(initialColor.g + ((scrollPosition / viewportHeight) * diffColor.g))},${scrollPosition >= viewportHeight ? finalColor.b : Math.round(initialColor.b + ((scrollPosition / viewportHeight) * diffColor.b))},${scrollPosition >= viewportHeight ? finalColor.a : (initialColor.a - ((scrollPosition / viewportHeight) * diffColor.a)).toFixed(2)})`
                

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
        }, [scrollPosition]);

    };


    backgroundColor();



    return (
        <motion.nav id='navbar' className={`backdrop-blur p-4 fixed top-0 w-full`}>

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
                            whileHover={{ color: '#ff9900' }}
                            className="text-white"
                        >
                            <a href={link.href}>{link.text}</a>
                        </motion.li>
                    ))}
                </ul>

                {/* Mobile Navigation Toggle Button */}
                <button
                    className="md:hidden text-white"
                    onClick={toggleMobileMenu}
                >
                    Menu
                </button>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden absolute top-full left-0 right-0 bg-gray-800 p-4"
                        >
                            <ul className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <motion.li
                                        key={link.id}
                                        whileHover={{ color: '#ff9900' }}
                                        className="text-white"
                                    >
                                        <a href={link.href}>{link.text}</a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
