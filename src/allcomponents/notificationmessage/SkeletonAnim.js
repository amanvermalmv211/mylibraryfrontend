import React from 'react';

export const EbookAnim = () => {
    return (
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
            return <div key={idx} className='border border-gray-300 overflow-hidden animate-pulse rounded-lg w-full md:w-72 bg-gray-200'>
                <div className='p-2 overflow-y-auto h-28'></div>
                <div target='_blank' className='w-full block p-5 bg-blue-200'></div>
            </div>
        })
    )
}

const ResultAnim = () => {
    return (
        <div className='h-[30rem] nobar overflow-y-auto'>
            {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((idx) => {
                    return <div key={idx} className={`p-5 ${idx % 2 === 0 ? "bg-gray-200 delay-1000" : "bg-gray-300"} animate-pulse`}></div>
                })
            }
        </div>
    )
}

export default ResultAnim;