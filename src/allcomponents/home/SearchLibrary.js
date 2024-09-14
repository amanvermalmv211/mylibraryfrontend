import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchLibrary = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Search Library - ML";
    }, []);

    // eslint-disable-next-line
    const [spinLoading, setLoading] = useState(false);

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700 min-h-screen'>
                <div className=''>
                    <h1 className='mb-4 text-4xl font-bold sm:text-5xl md:mb-6 md:text-center'>Search Library near to you!</h1>
                    <div className='border rounded-lg mx-auto max-w-[50rem] p-6 bg-gray-200'>

                        <form className='flex max-sm:flex-col max-sm:space-y-3 items-center justify-center sm:space-x-4'>
                            <input type="text" className='rounded-lg px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 w-full' placeholder='Search your local area' />

                            <input type="text" className='rounded-lg px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 w-full' placeholder='District, PIN Code' />

                            <button type='submit' className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2 max-md:w-full w-2/5'>
                                <span>Get Library</span>
                                {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchLibrary;