"use client"
import { useState, useEffect } from "react";
import { signOut, useSession } from 'next-auth/react'
import { studentDashboardNavLinks, teacherDashboardNavLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Loader from "../Loader";
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { getUserFromCookie } from "../apis/credentialSession";




const Sidebar = () => {

  const router = useRouter()
  const { data: session, status } = useSession()
  const [credentialsSession, setCredentialsSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  // while (status === 'loading') {
  //   return (
  //     <div className='absolute top-1/2 left-1/2'>
  //       <ColorRing
  //         visible={true}
  //         height="80"
  //         width="80"
  //         ariaLabel="color-ring-loading"
  //         wrapperStyle={{}}
  //         wrapperClass="color-ring-wrapper"
  //         colors={[colors.secondaryLight, colors.secondary, colors.secondaryDark, colors.secondaryDark2, colors.secondaryDark3, colors.secondaryDark4]}
  //       />
  //     </div>
  //   )
  // }

  if (session?.user.birthday === null || session?.user.role === null) {
    router.push('/profile/complete')
  }

  const signOutEmail = async () => {
    try {
      const res = await fetch('/api/auth/email/logout', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.status === 200) {
        router.push('/')
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {

    const getData =  async ()  =>{
      const data = await getUserFromCookie()
      setCredentialsSession(data)
    }
    getData()
  }, [])

  const pathname = usePathname()
  let navLinks = []
  if (pathname.includes('student')) {
    navLinks = studentDashboardNavLinks
  } else if (pathname.includes('teacher')) {
    navLinks = teacherDashboardNavLinks
  }



  return (
    <div className='fixed top-0 w-full h-[60px]'>
      <Loader visible={loading} />

      <div className="bg-primary-transparent my_blur border-b-4 border-primary-light h-[60px] p-1">

        <motion.nav id='navbar' className="p-4 fixed top-0 w-full h-[60px] my_blur">

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

            {/* Mobile Navigation Toggle Button */}
            <button
              className="sm:hidden text-white z-20"
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

                    <motion.li
                      key={"signout"}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.1, delay: navLinks.length * 0.1, ease: "easeInOut" }}
                      exit={{ opacity: 0, x: -50, transition: { duration: 0.1 }}}

                      whileHover={{ color: '#ff9900' }}
                      className="text-white text-right text-base py-2 cursor-pointer"
                      onClick={() => {
                        setLoading(true)
                        if (session) {
                          signOut({ callbackUrl: '/' })
                        } else if (credentialsSession) {
                          signOutEmail()
                        } else {
                          console.log(session, credentialsSession);
                        }
                      }}
                      >Sign out</motion.li>




                  </ul>



                </motion.aside>
              )}
            </AnimatePresence>

            {/* <Image src={"/assets/icons/google.svg"} width={25} height={25} className='rounded-full cursor-pointer' /> */}
          </div>
        </motion.nav>

      </div>
      <div className="sidebar_container">
        <div className='w-full h-full flex flex-col'>
          {/* <h1 className='text-xl  pt-2 pb-12 px-2 h-fit '>AssessAI</h1> */}

          <ul className={`h-[calc(100vh-80px)] ${navLinks.length === 0 ? 'hidden' : 'flex'} flex flex-col items-start justify-evenly text-2xl`}>
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`text-white w-full py-2 cursor-pointer ${link.href==pathname?"bg-secondary rounded-md hover:text-white":" hover:text-secondary"}`}>
                <Link
                  href={link.href}
                  className={`flex flex-row items-center gap-2 cursor-pointer `}>
                  <div>{link.icon}</div>
                  <div>{link.text}</div>
                </Link>


              </li>
            ))}
            {navLinks.length !== 0 && (
              <li>
                <div className='flex flex-row items-center gap-2 text-white py-4 cursor-pointer hover:text-secondary'
                  onClick={() => {
                    setLoading(true)
                    if (session) {
                      signOut({ callbackUrl: '/' })
                    } else if (credentialsSession) {
                      signOutEmail()
                    } else {
                      router.replace('/')
                    }
                  }} >
                  <div><MdLogout /></div>
                  <div>Logout</div>
                </div>
              </li>
            )}

          </ul>
          {navLinks.length === 0 && (
            // Loading skeleton
            <ul>
              {
                [...Array(5)].map((_, i) => (
                  <li key={i}>
                    <div className="p-4 max-w-sm w-full ">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }

            </ul>
          )}


        </div>
      </div>

    </div>
  )
}

export default Sidebar