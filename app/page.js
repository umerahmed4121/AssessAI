import Image from 'next/image'
import Main from '@/components/Main'
import About from '@/components/About'

export default function Home() {
  return (
    <>     
    <Main />
      <div className='px-[10vw]'>
   
        <About />
      </div>

    </>
  )
}
