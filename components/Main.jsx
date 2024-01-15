import React from 'react'

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
        <div className='pt-[12vh] pl-[6vw] pr-[1vw] md:pt-[15vh]  lg:pt-[28vh] lg:pl-[10vh]'>
           <h1 className='text-3xl sm:text-6xl font-bold'>
            Welcome to AssessAI:
            <br />
            <span>Revolutionizing Education Assessment</span>
            </h1> 
            <p className='mt-12 text-lg lg:text-2xl font-medium'>Unlock the Future of Learning with Automated Answer Script Assessment!</p>
            
            <div className='w-[40%] sm:w-[20%] md:w-[16%] lg-[12%] mt-[16vh] px-4 py-2 bg-secondary rounded-md  text-center font-bold'>
              Get started
            </div>

        </div>
        
        
    </div>
  )
}

export default Main