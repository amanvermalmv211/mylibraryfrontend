import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialMediaSection = () => {
    return (
        <div className="text-gray-700 my-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold">Stay Connected With Us</h2>
                <p className="mt-3 text-lg">Join our online community for the latest updates, events, and discussions.</p>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <Link to="https://www.facebook.com/profile.php?id=100011377276805" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-blue-100 shadow-md shadow-blue-200 transition-all duration-300 hover:bg-blue-200">
                        <FaFacebookF className="text-4xl mx-auto text-blue-700 group-hover:scale-110 transition-all duration-300" />
                        <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300">Facebook</p>
                    </Link>

                    <Link to="https://www.instagram.com/invites/contact/?i=1ele9i6x7lf2r&utm_content=40gsjzh" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-pink-100 shadow-md shadow-pink-200 transition-all duration-300 hover:bg-pink-200">
                        <FaInstagram className="text-4xl mx-auto text-pink-500 group-hover:scale-110 transition-all duration-300" />
                        <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-pink-600 transition-all duration-300">Instagram</p>
                    </Link>

                    <Link to="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-red-100 shadow-md shadow-red-200 transition-all duration-300 hover:bg-red-200">
                        <FaYoutube className="text-4xl mx-auto text-red-600 group-hover:scale-110 transition-all duration-300" />
                        <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-red-600 transition-all duration-300">YouTube</p>
                    </Link>

                    <Link to="https://www.linkedin.com/in/aman-verma-770ab5252" target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-xl bg-blue-100 shadow-md shadow-blue-200 transition-all duration-300 hover:bg-blue-200">
                        <FaLinkedinIn className="text-4xl mx-auto text-blue-800 group-hover:scale-110 transition-all duration-300" />
                        <p className="mt-3 text-lg font-medium group-hover:scale-110 group-hover:text-blue-800 transition-all duration-300">LinkedIn</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaSection;