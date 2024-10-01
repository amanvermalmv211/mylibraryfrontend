import React from 'react';

export const LibownerProfileAnim = () => {
    return (
        <>
            <div className='pt-28 max-lg:pt-40 animate-pulse'>
                <div className='border bg-blue-100 max-w-screen-sm lg:h-48 mx-auto rounded-lg flex items-center justify-center p-2 relative'>

                    <div className='absolute top-2 right-2 p-2.5 bg-gray-300'></div>

                    <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 rounded-md bg-gray-300'></div>

                    <div className='max-lg:pt-12 mb-4 mt-4'>
                        <div className='bg-gray-300 w-44 p-3 rounded-md mx-auto'></div>
                        <div className='bg-gray-300 w-80 p-3 rounded-md mt-2'></div>
                        <div className='bg-gray-300 w-44 p-2.5 rounded-md mx-auto mt-4'></div>
                        <div className='bg-gray-300 w-72 p-2.5 rounded-md mx-auto mt-2'></div>
                    </div>
                </div>

                <div className='bg-gray-300 w-36 p-3 rounded-md mx-auto mt-8'></div>
                <div className='bg-gray-300 w-72 p-3 rounded-md mx-auto mt-2'></div>
                <div className='max-w-screen-xl h-[26rem] bg-gray-300 p-3 rounded-md mx-auto mt-4'></div>

            </div>
        </>
    )
}

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