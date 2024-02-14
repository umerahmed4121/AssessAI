"use client"

import { useRouter } from 'next/navigation'

import React from 'react'
import { useState } from 'react'
import Loader from '../Loader'

const GetStarted = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Loader visible={loading} />
            <button
                className='w-[55%] -3xs:w-[45%] -2xs:w-[40%] xs:w-[35%] sm:w-[27%] md:w-[22%] lg:w-[18%] xl:w-[15%] 2xl:w-[12%] mt-8 px-4 py-2 bg-secondary hover:bg-secondary-dark hover:scale-[103%] rounded-md  text-center font-bold cursor-pointer'
                onClick={() => {
                    setLoading(true)
                    router.push('/auth/login')
                }}
            >
                Get started
            </button>
        </>

    )
}

export default GetStarted