import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Sginup Page - ML";
    }, []);

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700'>

                <section className='border border-gray-300 mb-16 rounded-2xl flex items-center justify-center flex-col md:flex-row bg-gradient-to-tl from-orange-100 to-orange-50 lg:mx-12'>
                    <div className='w-full lg:w-2/5 h-52 lg:h-72 py-2 md:py-4'>
                        <img src="https://images.template.net/82880/free-studying-illustration-tmpqs.jpg" alt="" className='w-full h-full object-contain mix-blend-darken' />
                    </div>

                    <div className='lg:w-3/5 p-2 mb-6 lg:pr-8 cursor-default'>
                        <h1 className='text-4xl font-bold mb-3'>SignUp as Student</h1>
                        <p className='mb-4 font-semibold text-justify'>You can directly contect us on following platforms. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus.</p>

                        <div className='flex justify-center'>
                            <Link to="/student/signup" className='rounded-lg cursor-pointer bg-orange-600 px-16 py-2 font-semibold text-white hover:bg-orange-700'>Register</Link>
                        </div>

                    </div>
                </section>

                <section className='border border-gray-300 my-12 rounded-2xl flex items-center justify-center flex-col md:flex-row-reverse bg-gradient-to-tl from-green-100 to-green-50 lg:mx-12'>
                    <div className='w-full lg:w-2/5 h-52 lg:h-72 py-2 md:py-4'>
                        <img src="https://img.freepik.com/premium-vector/business-partnership-relation-concept-idea-with-tiny-people-character-team-working-partner-together_566886-2138.jpg" alt="" className='w-full h-full object-contain mix-blend-darken' />
                    </div>

                    <div className='lg:w-3/5 p-2 mb-6 lg:pl-8 cursor-default'>
                        <h1 className='text-4xl font-bold mb-3'>SignUp as Library Owner</h1>
                        <p className='mb-4 font-semibold text-justify'>You can directly contect us on following platforms. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus.</p>

                        <div className='flex justify-center'>
                            <Link to="/owner/signup" className='rounded-lg cursor-pointer bg-green-600 px-16 py-2 font-semibold text-white hover:bg-green-700'>Register</Link>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    )
}

export default SignupPage;