
import Loader from '../Loader';


const Row = () => {
    return (
        <div className='w-full grid grid-cols-[20%,70%] lg:grid-cols-[64px,100px,300px,auto,16px] justify-items-center items-center lg:px-4 gap-1 lg:gap-16'>
            <div className='bg-slate-200 w-10 h-10 lg:w-16 lg:h-16 rounded-full'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl hidden lg:grid'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl hidden lg:grid'></div>
            <div className='bg-slate-200 w-4 h-4 rounded hidden lg:grid'></div>

        </div>
    )
}

const Dashboard = () => {
    return (
        <>
            <Loader visible={true} />

            <div className="dashboard_container">
                <div className='w-full hidden sm:grid gap-12 animate-pulse'>
                    {[...Array(5)].map((_, i) => (
                        <Row key={i} />
                    ))}
                </div>

                <div className=' w-full grid sm:hidden gap-12 animate-pulse'>
                    {[...Array(5)].map((_, i) => (
                        <Row key={i} />
                    ))}
                </div>
            </div>


        </>
    )
}

export default Dashboard