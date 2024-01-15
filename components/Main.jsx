import React from 'react'
import Link from 'next/link'
/* 

sm: 640px
    padding-top: 4vh;
    padding-left: 6vw;
    padding-right: 1vw;
md: 768px
lg: 1024px
xl: 1280px


*/

const Main = () => {
  return (
    <div className='bg-[url("/assets/background-mobile.jpg")] sm:bg-[url("/assets/background.jpg")] w-full h-[94vh] sm:h-[100vh] bg-contain bg-bottom sm:bg-right-bottom bg-no-repeat'>
      <div className='w-[80%] pt-[12vh] pl-[6vw] pr-[1vw] md:pt-[15vh]  lg:pt-[28vh] lg:pl-[10vh]'>
        <h1 className='text-3xl sm:text-6xl font-bold'>
          Welcome to AssessAI:
          <br />
          <span>Revolutionizing Education Assessment</span>
        </h1>
        <p className='mt-12 text-lg lg:text-2xl font-medium'>Unlock the Future of Learning with Automated Answer Script Assessment!</p>
        {/* 
            
      'xxs': '375px',
      'xs': '425px',
            */}

        <div className='w-[55%] -3xs:w-[45%] -2xs:w-[40%] xs:w-[35%] sm:w-[27%] md:w-[22%] lg:w-[18%] xl:w-[15%] 2xl:w-[12%] mt-8 px-4 py-2 bg-secondary hover:bg-secondary-dark hover:scale-[103%] rounded-md  text-center font-bold cursor-pointer'>
          <Link href={"/auth/login"} >
          Get started
        </Link>
        </div>
        

      </div>


    </div>
  )
}

export default Main