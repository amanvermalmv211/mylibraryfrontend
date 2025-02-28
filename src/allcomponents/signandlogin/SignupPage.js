import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import stdsignup from '../images/stdsignup.svg';
import ownersignup from '../images/ownersignup.svg';

const SignupPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Sginup Page - ML";
    }, []);

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8'>
            <div className='mx-auto max-w-screen-xl px-4 md:px-8 pt-28 text-gray-700'>

                <section className='border border-gray-300 rounded-2xl flex items-center justify-center flex-col md:flex-row bg-gradient-to-tl from-orange-100 to-orange-50 lg:mx-12'>
                    <div className='w-full lg:w-2/5 lg:h-80'>
                        <img src={stdsignup} alt="" className='w-full h-full object-cover lg:object-contain' />
                    </div>

                    <div className='lg:w-3/5 p-2'>
                        <h1 className='text-4xl font-bold mb-3'>Sign-up as Student</h1>
                        <p className='font-semibold text-lg'>Join meriLibrary – Your Gateway to the Best Study Spaces!</p>

                        <ul className="mt-2 list-disc space-y-2 ml-4 mb-4">
                            <li><strong>Discover Libraries Near You</strong>: Find the best study spots with ease.</li>
                            <li><strong>Flexible Subscription Plans</strong>: Choose from daily, weekly, or monthly plans.</li>
                            <li><strong>Access Premium Facilities</strong>: Enjoy AC rooms, Wi-Fi, desk lamps, and more.</li>
                            <li><strong>Seamless Booking & Entry</strong>: Reserve your space and start studying.</li>
                        </ul>

                        <div className='flex justify-center m-2'>
                            <Link to="/student/signup" className='rounded-lg cursor-pointer bg-orange-600 px-16 py-2 font-semibold text-white hover:bg-orange-700'>Register</Link>
                        </div>
                    </div>
                </section>

                <section className='border border-gray-300 my-8 rounded-2xl flex items-center justify-center flex-col md:flex-row-reverse bg-gradient-to-tl from-green-100 to-green-50 lg:mx-12'>
                    <div className='w-full lg:w-2/5 lg:h-80'>
                        <img src={ownersignup} alt="" className='w-full h-full object-cover lg:object-contain' />
                    </div>

                    <div className='lg:w-3/5 p-2 lg:pl-6'>
                        <h1 className='text-4xl font-bold mb-3'>Sign-up as Library Owner</h1>
                        <p className='font-semibold text-lg'>Partner with meriLibrary – Connect Students to Your Library!</p>
                        
                        <ul className="mt-2 list-disc space-y-2 ml-4 mb-4">
                            <li><strong>Increase Visibility</strong>: Let students easily discover your library.</li>
                            <li><strong>Manage Subscriptions</strong>: Approve, track, and manage student enrollments.</li>
                            <li><strong>Highlight Your Facilities</strong>: Showcase AC rooms, Wi-Fi, study desks, and more.</li>
                            <li><strong>Real-Time Insights</strong>: Get analytics on student preferences and library usage.</li>
                        </ul>

                        <div className='flex justify-center m-2'>
                            <Link to="/owner/signup" className='rounded-lg cursor-pointer bg-green-600 px-16 py-2 font-semibold text-white hover:bg-green-700'>Register</Link>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    )
}

export default SignupPage;