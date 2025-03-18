import React, { useEffect } from 'react';
import Services from './Services';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import GuidePage from './GuidePage';
import SocialMediaSection from './SocialMediaSection';
import Studying from '../images/Studying.svg';
import CallToAction from './CallToAction';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="bg-gray-50 pb-6 sm:pb-8 lg:pb-12 relative overflow-hidden">

                <Helmet>
                    <title>meriLibrary - Get Library around you</title>
                    <meta name="description" content="Explore top-rated libraries in your city with merilibrary. Find study spaces, subscribe to a seat, and enjoy a peaceful reading environment." />
                </Helmet>

                <div className="mx-auto max-w-screen-2xl px-4 md:px-8 text-gray-700">
                    <section className="mb-8 flex flex-col justify-around gap-6 sm:gap-10 md:mb-16 md:gap-16 lg:flex-row pt-28 lg:pt-36">
                        <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12">
                            <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:mb-6 md:text-6xl">Get Library around you!</h1>

                            <p className="mb-8 font-semibold text-blue-500 md:mb-12 md:text-lg xl:text-xl">Find the perfect library that fits your needs with meriLibrary – your search ends here!</p>

                            <div className="flex justify-center">
                                <Link to="/merilibrary-search-library" className="rounded-lg bg-blue-600 px-16 py-3 font-semibold text-white hover:bg-blue-700 flex items-center justify-center space-x-2"><span>Click to Search</span> <IoIosSearch className='scale-150' /></Link>
                            </div>
                        </div>

                        <div className="">
                            <img src={Studying} loading="lazy" alt="meriLibrary" className="h-full w-full object-cover object-center" />
                        </div>
                    </section>

                    <section className="flex items-center justify-center border-t py-8">
                        <div className="-mx-6 grid grid-cols-2 gap-8 md:flex items-center justify-around w-full">
                            <div className="px-6 md:px-8">
                                <span className="block text-center text-4xl font-bold text-blue-600">7</span>
                                <span className="block text-center text-xl font-semibold">People</span>
                            </div>

                            <div className="px-6 md:px-8">
                                <span className="block text-center text-4xl font-bold text-blue-600">5+</span>
                                <span className="block text-center text-xl font-semibold">Cities</span>
                            </div>

                            <div className="px-6 md:px-8">
                                <span className="block text-center text-4xl font-bold text-blue-600">50+</span>
                                <span className="block text-center text-xl font-semibold">Libraries</span>
                            </div>

                            <div className="px-6 md:px-8">
                                <span className="block text-center text-4xl font-bold text-blue-600">2500+</span>
                                <span className="block text-center text-xl font-semibold">Students</span>
                            </div>

                        </div>
                    </section>

                    <Services />

                    <GuidePage />

                    <CallToAction />

                    <SocialMediaSection />

                </div>

            </div>
        </>

    )
}

export default HomePage;