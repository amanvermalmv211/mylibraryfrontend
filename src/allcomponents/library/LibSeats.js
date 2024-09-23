import React from 'react'
import { PiChairFill } from 'react-icons/pi';

const LibSeats = () => {
    return (
        <div className='flex justify-center'>
            <div className='grid grid-flow-row gap-1 grid-cols-12 border border-black place-items-center py-4 w-full lg:mx-32 p-1 rounded-lg bg-blue-200'>

                <Seats />

            </div>
        </div>
    )
}

export default LibSeats;

export const Seats = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 61, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4].map((data, idx) => {
                    return <div key={idx} className='cursor-pointer select-none group'>
                        <div className={`${(idx <= 11) || (idx > 23 && idx <= 35) || (idx > 47 && idx <= 59) || (idx > 71 && idx <= 83) || (idx > 95 && idx <= 107) ? "bg-blue-500 group-hover:bg-blue-600 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>

                        <PiChairFill key={idx} size={25} className={`${(idx <= 11) || (idx > 23 && idx <= 35) || (idx > 47 && idx <= 59) || (idx > 71 && idx <= 83) ? "mb-4" : ""} md:w-12 text-gray-600 group-hover:text-gray-700`} />

                        <div className={`${(idx > 11 && idx <= 23) || (idx > 35 && idx <= 47) || (idx > 59 && idx <= 71) || (idx > 83 && idx <= 95) ? "bg-pink-500 group-hover:bg-pink-600 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>

                    </div>
                })

            }
        </>
    )
}