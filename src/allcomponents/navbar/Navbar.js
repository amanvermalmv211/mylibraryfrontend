import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import authContext from '../../context/auth/authContext';
import { toast } from 'react-toastify';
import { userType } from '../../libs/AllRoutes';

const Navbar = () => {

    const context = useContext(authContext);
    const { islogedin, setIsloggedin, allLinks, setLinks, userProfile, setUserProfile } = context;

    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if(userType()){
            setUserProfile(userType() + "/profile");
        }
        else{
            setUserProfile("login")
        }
        setLinks();

        // eslint-disable-next-line
    }, []);

    const handleLogout = ()=>{
        localStorage.removeItem("type");
        localStorage.removeItem("authtoken");
        setLinks();
        setUserProfile("login")
        setIsloggedin(false);
        toast.success("User logout successfully");
        navigate("/");
    }

    return (
        <>
            <div className='fixed top-0 p-4 w-full flex items-center justify-center z-50'>
                <div className='border border-gray-300 md:w-4/5 w-full flex items-center justify-between px-2 md:px-4 bg-gray-200 shadow-[1px_6px_10px] shadow-gray-400 rounded-xl'>
                    <div className='flex items-center space-x-2'>
                        <Link to="/">
                            <img src="https://dcassetcdn.com/design_img/2495449/83570/83570_13222851_2495449_a5ee7223_image.png" alt="" className='w-20 h-14 scale-150' />
                        </Link>

                        <div className='border-l border-blue-700 hidden lg:flex'>
                            <ul>
                                {
                                    allLinks.map((route) => {
                                        return <Link to={route.link} key={route.name} className='m-2'>{route.name}</Link>
                                    })
                                }
                            </ul>
                        </div>

                    </div>

                    <div className='hidden lg:flex items-center justify-center space-x-8'>

                        <Link to="/searchlibrary">
                            <IoIosSearch className='scale-150' />
                        </Link>

                        <Link to={"/"+userProfile} className="border border-black p-0.5 rounded-full">
                            <FaUser className='scale-90' />
                        </Link>

                        {
                            islogedin ? <div className='p-1.5 border rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 cursor-pointer' onClick={handleLogout} >Logout</div> : <Link to="/signup" className='p-1.5 border rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6'>SignUp Now</Link>
                        }
                    </div>

                    <div className='lg:hidden pr-2 flex items-center justify-center space-x-6'>

                        <Link to="/searchlibrary">
                            <IoIosSearch className='scale-150' />
                        </Link>

                        <Link to={"/"+userProfile} className="border border-black p-0.5 rounded-full">
                            <FaUser className='scale-90' />
                        </Link>

                        <div>
                            {open ? <RxCross2 onClick={() => { setOpen(!open) }} className='scale-150' /> : <HiMiniBars3CenterLeft onClick={() => { setOpen(!open) }} className='scale-150' />}
                        </div>

                    </div>
                </div>

            </div>

            <div className={`fixed lg:hidden top-16 px-4 w-full h-full z-40 overflow-hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute right-0 w-full max-h-full ${open ? '-top-16' : 'top-[-100%]'} transition-all duration-500 ease-in-out flex justify-center px-4`}>
                    <div className='border border-gray-300 bg-gray-200 mt-[5.7rem] md:w-4/5 w-full rounded-xl overflow-y-auto py-2'>

                        <ul className='flex flex-col text-center' onClick={() => { setOpen(!open) }}>
                            <Link to="/" className='p-3'>Home </Link>
                            {
                                allLinks.map((routes) => {
                                    return <Link to={routes.link} key={routes.name} className='p-3'>{routes.name}</Link>
                                })
                            }
                            {
                                islogedin ? <div className='p-3 mb-3'>
                                    <div className='p-3 border rounded-full bg-blue-600 text-white px-20 inline' onClick={handleLogout} >Logout</div>
                                </div> : <div className='p-3 mb-3'>
                                    <Link to="/signup" className='p-3 border rounded-full bg-blue-600 text-white px-20'>SignUp Now</Link>
                                </div>
                            }
                        </ul>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Navbar;