"use client"

import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoPersonAddOutline, IoCheckmarkCircle  } from "react-icons/io5";
import { useState } from 'react'
import { getParticipants } from './api/participants'
import { useQuery } from 'react-query'
import Image from 'next/image'
import Spinner from '@/components/Spinner';

const Participants = ({ participants, onParticipantsChange, user_id }) => {

    

    const { data, status } = useQuery('participants', getParticipants.bind(this, user_id),{enabled: user_id !== null})
    
    // const toggleParticipants = (id) => {
    //     participants.filter(participant => participant.participant_id !== id)
    //     if(participants.includes({participant_id:id})){
    //         onParticipantsChange(participants.filter(participant => participant.participant_id !== id))
            
    //     }
    //     else{
    //         onParticipantsChange([...participants, {
    //             participant_id:id,
    //             responseStatus:"PENDING"
    //         }])
    //     }
    // }
    const toggleParticipants = (id) => {
        // Check if an object with the given id already exists in the array
        const index = participants.findIndex(obj => obj.participant_id === id);
      
        if (index === -1) {
          // If the object does not exist, add it to the array
          onParticipantsChange([...participants, { participant_id: id, responseStatus: "PENDING" }]);
        } else {
          // If the object exists, remove it from the array
          const updatedArray = [...participants];
          updatedArray.splice(index, 1);
          onParticipantsChange(updatedArray);
        }
      };

      const iconCondition = (id) => {
        const index = participants.findIndex(obj => obj.participant_id === id);
        return index !== -1;
      };
      


    return (
        <div className='w-full h-full p-1 sm:p-2 lg:p-4 flex flex-col gap-2'>
           
            <div className='flex flex-row items-center'>
                <input type="text" className='bg-primary-light w-[88%] focus:outline-none border-y border-l rounded-tl-md rounded-bl-md p-2' />
                <div className='bg-primary-light w-[10%] h-full py-3 pr-6 border-y border-r rounded-r-md'><FaSearch /></div>
            </div>
            <div className=' w-full'>

                {status === 'loading' && <Spinner visible={true}/> }
                {status === 'error' && <div>Error fetching data</div>}
                {status === 'success' && data?.length !== 0  && (
                    <ul>
                        {data?.map((participant) => (
                            <li key={participant._id} className=' p-1 grid grid-cols-[10%,auto,10%] items-center wrap'>
                                <Image src={`${participant.picture? participant.picture: "/assets/icons/avatar.svg"}`} alt={participant.name} width={40} height={40} className={`w-10 h-10 rounded-full ${participant.picture? "":"bg-slate-300 p-1"}`}/>
                                <div className='p-1'>
                                    <div>{participant.name}</div>
                                    <div className="text-sm">{participant.email}</div>
                                </div>
                                <div className='w-full h-full flex items-center' onClick={()=>{toggleParticipants(participant._id)}}>
                                    {
                                        iconCondition(participant._id)? <IoCheckmarkCircle className='w-full text-3xl'/>:<IoPersonAddOutline className='w-full text-3xl'/>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                )}


            </div>


        </div>
    )
}

export default Participants