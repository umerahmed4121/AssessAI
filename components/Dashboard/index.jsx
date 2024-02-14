
import Loader from '../Loader';


const Row = () => {
    return (
        <div className='grid grid-cols-[64px,100px,300px,auto,16px] justify-items-center items-center gap-16'>
            <div className='bg-slate-200 w-16 h-16 rounded-full'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl'></div>
            <div className='bg-slate-200 w-full h-4 rounded-3xl'></div>
            <div className='bg-slate-200 w-4 h-4 rounded'></div>

        </div>
    )
}

const Dashboard = () => {
    return (
        <div className='dashboard_container '>
            <Loader visible={true}/>
            
            <div className='grid gap-12 animate-pulse'>
                {[...Array(5)].map((_, i) => (
                    <Row key={i} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard