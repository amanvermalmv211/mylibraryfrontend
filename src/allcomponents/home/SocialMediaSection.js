import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialMediaSection = () => {
    return (
        <div className="text-gray-700 my-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold">Stay Connected With Us</h2>
                <p className="mt-3 text-lg">Join our online community for the latest updates, events, and discussions.</p>

                <div className='w-full max-w-screen-md relative mx-auto'>
                    <div className='absolute top-0 -left-4 w-44 md:w-72 h-44 md:h-72 filter blur-xl opacity-70 bg-purple-200 rounded-full animate-blob mix-blend-multiply'></div>
                    <div className='absolute top-0 -right-4 w-44 md:w-72 h-48 filter blur-xl opacity-70 bg-yellow-200 rounded-full animate-blob animation-delay-2000 mix-blend-multiply'></div>
                    <div className='absolute -bottom-20 left-20 md:left-56 w-44 md:w-72 h-52 filter blur-xl opacity-70 bg-pink-200 rounded-full animate-blob animation-delay-4000 mix-blend-multiply'></div>
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <Link to="https://www.facebook.com/share/12Dc1E1LmzN" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-blue-100 shadow-md shadow-blue-200 transition-all duration-300 hover:bg-blue-200">
                            <FaFacebookF className="text-4xl mx-auto text-blue-700 group-hover:scale-110 transition-all duration-300" />
                            <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300">Facebook</p>
                        </Link>

                        <Link to="https://www.instagram.com/merilibrary.in" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-pink-100 shadow-md shadow-pink-200 transition-all duration-300 hover:bg-pink-200">
                            <FaInstagram className="text-4xl mx-auto text-pink-500 group-hover:scale-110 transition-all duration-300" />
                            <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-pink-600 transition-all duration-300">Instagram</p>
                        </Link>

                        <Link to="https://www.youtube.com/@merilibrary-in" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-red-100 shadow-md shadow-red-200 transition-all duration-300 hover:bg-red-200">
                            <FaYoutube className="text-4xl mx-auto text-red-600 group-hover:scale-110 transition-all duration-300" />
                            <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-red-600 transition-all duration-300">YouTube</p>
                        </Link>

                        <Link to="https://www.linkedin.com/in/merilibrary-services-00525b353" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-blue-100 shadow-md shadow-blue-200 transition-all duration-300 hover:bg-blue-200">
                            <FaLinkedinIn className="text-4xl mx-auto text-blue-800 group-hover:scale-110 transition-all duration-300" />
                            <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-blue-800 transition-all duration-300">LinkedIn</p>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SocialMediaSection;