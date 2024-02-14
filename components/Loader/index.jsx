"use client"

import React from 'react'
import { Bars } from 'react-loader-spinner'
import { colors } from '@/styles'

const Loader = ({visible}) => {
    return (
        visible && (
        <div className='absolute top-0 left-0 w-full h-screen z-20 bg-[#00000080] my_blur flex justify-center items-center'>

        <Bars
            height="80"
            width="80"
            color={colors.secondary}
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>)
        
    )
}

export default Loader