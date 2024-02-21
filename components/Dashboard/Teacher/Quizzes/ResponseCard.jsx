import React from 'react'

const ResponseCard = ({ assessment, key }) => {
    return (
        <>
            <div className='w-full bg-primary-light border border-primary-light-2 rounded-md my-2 text-base text-justify'>

                <div className='w-full text-xl p-4 flex items-center justify-between'>
                    
                        Question: {assessment?.question} &nbsp;
                        ({assessment?.totalMarks} marks)
                    
                </div>
                <div className='w-full text-xl p-4'>
                    Answer: {assessment?.answer}
                </div>
                <div className='w-full p-4 '>
                    <div className='text-base'>
                        Responses:
                    </div>
                    <div className='w-full italic pl-10'>
                        {assessment?.responses?.map((response, index) => (
                            <div key={index} className='w-full text-xl p-2'>
                                {index + 1}.{" "}
                                {response?.answer}
                            </div>
                        ))}

                    </div>


                </div>



            </div>

        </>
    )
}

export default ResponseCard