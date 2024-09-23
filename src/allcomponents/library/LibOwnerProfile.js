import React from 'react'

const LibOwnerProfile = () => {
  return (
    <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className='pt-28 max-lg:pt-40'>
          <div className='border border-black max-w-screen-sm mx-auto h-40 rounded-md flex items-center justify-center relative'>
            <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 overflow-hidden rounded-md border border-black bg-gray-200'>
              <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg' alt='Profile Pic' className='w-full h-full object-cover' />
            </div>
            <div className='border border-blue-700 w-full h-full'>
              <p className='flex items-center h-[20%] justify-center'>Library Owner Name</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default LibOwnerProfile;