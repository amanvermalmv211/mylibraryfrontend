import React, { useEffect } from 'react';
import notifimg from '../images/notifimg.svg';

const NotificationByOwner = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
        document.title = "Notification - ML";
    }, []);

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28 text-gray-700 select-none'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Notification Generation</h1>
                    <p className='text-justify max-w-screen-lg mx-auto text-xl'>This feature will be unlocked one month after you start your subscription. Once activated, you’ll be able to send notifications to any active student in your library. Stay connected and easily communicate with your students, ensuring they’re always up to date with the latest information and updates.</p>
                    <div className='w-full h-80'>
                        <img src={notifimg} alt='Notifiction' className='w-full h-full object-contain' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NotificationByOwner;