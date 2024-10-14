import React, { useState } from 'react';
import InputBox from '../notificationmessage/InputBox';

const InitLibrary = () => {

    const [libDetails, setLibDetails] = useState({
        ownername: "",
        libname: "",
        contactnum: "",
        emgcontactnum: "",
        address: "",
        shifts: []
    })

    const handleOnChange = (key, value) =>{
        setLibDetails({
            ...libDetails,
            [key]: value
        })
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12 text-gray-700'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28 text-center font-bold text-2xl md:text-4xl'>Name of the library owner is here</div>

                <div>
                    <div>Addres: <span>Library address should be at here</span></div>
                    <div>Contact No: <span>6306805527</span></div>
                    <div className='flex items-center justify-center'>
                        <form className='border border-black w-full lg:w-3/5 space-y-3'>
                        <InputBox name="Name" id="ownername" type="text" value={libDetails.ownername} placeholder="Enter the name" handleOnChange={handleOnChange} />

                        </form>
                    </div>

                </div>

                <div className='flex items-center justify-center'>
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14791.430570874723!2d83.55957323380159!3d25.571753342118296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991ff08605d2193%3A0x71b090d70df7402!2sMount%20Litera%20Zee%20School!5e0!3m2!1sen!2sin!4v1727185211467!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full lg:w-3/5 h-[26rem]'></iframe>
                </div>

            </div>
        </div>
    )
}

export default InitLibrary;