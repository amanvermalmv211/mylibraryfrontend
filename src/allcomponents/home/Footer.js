import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { footerLinks } from '../../libs/AllRoutes';
import myLiblogo from '../images/myLiblogo1.svg';


const Footer = () => {

    const [allLinks, setAllLinks] = useState(footerLinks);
    useEffect(() => {
        setAllLinks(footerLinks);
    }, []);

    return (
        <div className="bg-neutral-700 text-gray-200">
            <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">

                <div className='py-10 text-center'>
                    <Link to="/" className='w-64 inline-block'>
                        <img src={myLiblogo} alt="" className='w-full h-14 object-fill' />
                    </Link>
                </div>


                <div className="flex flex-col items-center justify-between gap-4 border-t border-b py-6 md:flex-row rounded-lg px-2">

                    <ul className='flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6'>
                        {
                            allLinks.map((routes) => {
                                return <Link to={routes.link} key={routes.name} className="transition duration-100 hover:text-blue-500 hover:scale-105 active:text-blue-600">{routes.name}</Link>
                            })
                        }
                    </ul>

                    <div className="flex items-center justify-center gap-4 lg:justify-start">
                        <span className="text-sm font-semibold uppercase tracking-widest text-blue-400 sm:text-base">Social</span>
                        <span className="h-px w-12 bg-blue-400"></span>

                        <div className="flex items-center justify-center gap-8">

                            <Link to="https://www.facebook.com/share/12Dc1E1LmzN" target="_blank" className="text-blue-600 bg-white rounded-full transition duration-200 hover:text-blue-700 scale-150">
                                <FaFacebook />
                            </Link>

                            <Link to="https://www.instagram.com/merilibrary.in" target="_blank" className="text-pink-500 transition duration-200 hover:text-pink-600 scale-150">
                                <FaInstagram />
                            </Link>

                            <Link to="https://www.youtube.com/@merilibrary-in" target="_blank" className="text-red-500 transition duration-200 hover:text-red-600 scale-150">
                                <FaYoutube />
                            </Link>

                            <Link to="https://www.linkedin.com/in/merilibrary-services-00525b353" target="_blank" className="text-blue-700 bg-white rounded-lg transition duration-200 hover:text-blue-800 active:text-gray-600 scale-150">
                                <ImLinkedin />
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="py-8 text-center text-sm">© 2025 - Present meriLibrary. All rights reserved.</div>
            </footer>
        </div>
    )
}

export default Footer;