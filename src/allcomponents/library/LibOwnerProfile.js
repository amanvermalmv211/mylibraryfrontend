import React from 'react';

const LibOwnerProfile = () => {
  return (
    <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>

        <div className='pt-28 max-lg:pt-40'>
          <div className='border bg-blue-100 max-w-screen-sm lg:h-48 mx-auto rounded-lg flex items-center justify-center p-2 relative'>

            <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 overflow-hidden rounded-md border border-black bg-gray-200'>
              <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg' alt='Profile Pic' className='w-full h-full object-cover' />
            </div>

            <div className='w-full py-4'>
              <div className='flex items-center justify-center flex-col max-lg:pt-12 text-center mb-4'>
                <h1 className='text-xl lg:text-2xl font-semibold'>Library Owner Name</h1>
                <h2 className='text-lg lg:text-xl font-semibold'>Here We will display the name of the library</h2>
              </div>

              <div className='text-center'>
                <div><span className='font-semibold'>Contact Number : </span><span>6306805527, 9795544677</span></div>
                <div><span className='font-semibold'>Active Students : </span><span>200</span></div>
              </div>
            </div>

          </div>
        </div>

        <div className='my-8 flex flex-col items-center justify-center'>
          <div className='text-center pb-4'>
            <h1 className='text-2xl md:text-3xl font-bold'>Location Info.</h1>
            <p className='md:text-xl'>Tedhi Bazar Post: Markeengang Ghazipur 233001</p>
          </div>
          <div className='w-full lg:px-20'>
            <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14791.430570874723!2d83.55957323380159!3d25.571753342118296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991ff08605d2193%3A0x71b090d70df7402!2sMount%20Litera%20Zee%20School!5e0!3m2!1sen!2sin!4v1727185211467!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-[26rem]'></iframe>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LibOwnerProfile;