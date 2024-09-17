import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authContext from '../../context/auth/authContext';
import { loginValidation } from '../../libs/Validation';

const Login = () => {

    const context = useContext(authContext);
    const { setIsloggedin, setLinks } = context;

    const [signupDetails, setSignupDetails] = useState({
        email: "",
        password: ""
    });

    let navigate = useNavigate();

    const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "User Sign up - ML";
    }, [])


    const handleOnChange = (key, value) => {
        setSignupDetails({
            ...signupDetails,
            [key]: value
        })
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {

        if(!loginValidation(signupDetails)){return}

        if (!isClicked) {
            try {
                setSpinSingUpLoading(true);
                const response = await fetch(apiList.login, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: signupDetails.email, password: signupDetails.password })
                });

                const json = await response.json();
                if (json.success) {
                    localStorage.setItem("authtoken", json.authtoken);
                    localStorage.setItem("type", json.type);
                    toast.success(json.message);
                    setLinks(json.type);
                    setIsloggedin(true);
                    setSpinSingUpLoading(false);
                    navigate("/")
                }
                else {
                    toast.error(json.message);
                    setSpinSingUpLoading(false);
                    setIsClicked(false);
                }

            }
            catch (err) {
                toast.warn("Internal Server Error");
                setSpinSingUpLoading(false);
                isClicked(false);
            }

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className={`max-w-sm w-full space-y-2 shadow-lg shadow-gray-400 rounded-xl p-4 pb-8 bg-gray-200 relative`}>
                <div className='space-y-1' data-aos="zoom-in" data-aos-duration="500">
                    <div className="flex justify-center">
                        <div className="w-14 h-14 overflow-hidden rounded-full shadow-lg shadow-gray-600">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className={`text-center text-2xl font-extrabold`}>Login to your account</h2>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className={`space-y-3`}>

                        <div>
                            <label htmlFor="phone" className="block ml-1">Email</label>
                            <div className='flex'>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email address"
                                    className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    value={signupDetails.email}
                                    onChange={(event) => { handleOnChange("email", event.target.value) }}
                                />
                            </div>
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" className="block ml-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm -mb-3"
                                placeholder="Enter Password"
                                value={signupDetails.password}
                                onChange={(event) => { handleOnChange("password", event.target.value) }}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye/> : <FaEyeSlash/>
                                }
                            </button>
                        </div>
                        <Link to="/forgotpassword" className='text-red-500 font-medium text-end w-full inline-block text-sm underline'>Forgot Password?</Link>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2 -mt-4`}
                            onClick={handleLogin}
                            >
                            <span>Login</span>
                            {spinSingUpLoading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
                        </button>
                    </div>
                </form>

                <div className='absolute -bottom-6 -left-8'>
                    <div className='w-28 h-28'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/016/717/556/small/man-reading-book-beside-bookshelf-free-png.png" alt="" className='w-full h-full' />
                    </div>
                </div>

                <div>
                    <p className='text-center text-sm mt-3'>Don't have account? <Link to='/signup' className='underline text-blue-700 font-semibold'>SignUp</Link></p>
                    
                </div>

            </div>
        </div>
    )
}

export default Login;