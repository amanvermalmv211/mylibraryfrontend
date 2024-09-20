import React from 'react';
import { PiChairFill } from 'react-icons/pi';

const LibOwner = () => {
    return (
        <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-8'>Library name should be at here</h1>

                </div>

                <div className='flex justify-center'>
                    <div className='grid grid-flow-row gap-1 grid-cols-12 border border-black place-items-center py-4 w-full lg:mx-40 p-1 rounded-lg'>
                        {
                            [1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 61, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4].map((data, idx) => {
                                return <>
                                    <div className={`${idx <= 11 ? "mb-4" : ""}`}>
                                        <div className={`${idx <= 11 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 23 && idx <= 35 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 47 && idx <= 59 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 71 && idx <= 83 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 95 && idx <= 107 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <PiChairFill key={idx} size={25} className={`${idx > 23 && idx <= 35 && "mb-4"} ${idx > 47 && idx <= 59 && "mb-4"} ${idx > 71 && idx <= 83 && "mb-4"} md:w-12`} />
                                        <div className={`${idx > 11 && idx <= 23 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 35 && idx <= 47 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 59 && idx <= 71 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                        <div className={`${idx > 83 && idx <= 95 ? "bg-gray-700 h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md`}>{idx}</div>
                                    </div>
                                </>
                            })

                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default LibOwner;