import React from 'react'
import { PiChairFill } from 'react-icons/pi';

const LibSeats = () => {
    return (
        <div className='flex justify-center'>
            <div className='grid grid-flow-row gap-1 grid-cols-12 border border-black place-items-center py-4 w-full lg:mx-32 p-1 rounded-lg bg-blue-200'>

                <Seats/>

            </div>
        </div>
    )
}

export default LibSeats;



const Seats = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 61, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4].map((data, idx) => {
                    return <>
                        <div className={`${idx <= 11 ? "mb-4" : ""}`}>
                            <div className={`${idx <= 11 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 23 && idx <= 35 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 47 && idx <= 59 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 71 && idx <= 83 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 95 && idx <= 107 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <PiChairFill key={idx} size={25} className={`${idx > 23 && idx <= 35 && "mb-4"} ${idx > 47 && idx <= 59 && "mb-4"} ${idx > 71 && idx <= 83 && "mb-4"} md:w-12`} />
                            <div className={`${idx > 11 && idx <= 23 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 35 && idx <= 47 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 59 && idx <= 71 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                            <div className={`${idx > 83 && idx <= 95 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx + 1}</div>
                        </div>
                    </>
                })

            }
        </>
    )
}