import React from 'react';
import LibSeats from './LibSeats';

const LibOwner = () => {
    return (
        <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-8'>Library name should be at here</h1>

                </div>

                <LibSeats/>

            </div>
        </div>
    )
}

export default LibOwner;