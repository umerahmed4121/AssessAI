'use client';

import Image from 'next/image'
import Main from '@/components/Main'
import About from '@/components/About'


import { useRouter } from 'next/navigation'

import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'

const navLinks = [
  { id: 1, text: 'Home', href: '/' },
  { id: 2, text: 'About', href: '/about' },
  { id: 3, text: 'Services', href: '/services' },
  { id: 4, text: 'Contact', href: '/contact' },
];

export default function Home() {

  return (
    <>
      <Navbar navLinks={navLinks} />
      <Main />
      <div className='px-6 sm:px-[10vw]'>

        <About />
      </div>

    </>
  )
}
