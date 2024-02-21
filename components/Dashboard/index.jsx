
import Loader from '../Loader';


const Row = () => {
    return (
        <div className='grid grid-cols-[30%,70%] sm:grid-cols-[64px,100px,300px,auto,16px] justify-items-center items-center px-4 gap-1 sm:gap-16'>
            <div className='bg-slate-200 w-10 h-10 sm:w-16 sm:h-16 rounded-full'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl hidden sm:grid'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl hidden sm:grid'></div>
            <div className='bg-slate-200 w-4 h-4 rounded hidden sm:grid'></div>

        </div>
    )
}

const Dashboard = () => {
    return (
        <div className=''>
            <Loader visible={true} />

            <div className='hidden sm:grid gap-12 animate-pulse'>
                {[...Array(5)].map((_, i) => (
                    <Row key={i} />
                ))}
            </div>

            <div className='grid sm:hidden gap-12 animate-pulse'>
                {[...Array(5)].map((_, i) => (
                    <Row key={i} />
                ))}
            </div>


        </div>
    )
}

export default Dashboard