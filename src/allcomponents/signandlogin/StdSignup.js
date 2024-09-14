import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import signupValidation from '../../libs/Validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StdSignup = () => {

    const [signupDetails, setSignupDetails] = useState({
        name: "",
        email: "",
        password: "",
        confPassword: "",
        otp: "",
        type: "stduser"
    });

    let navigate = useNavigate();

    const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isOTPSend, setIsOTPSend] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "User Sign up - ML";
    }, []);


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

        if (!signupValidation(signupDetails)) { return }

        if (!isOTPSend) {
            try {
                setSpinSingUpLoading(true);
                const response = await fetch(apiList.usersignup, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupDetails)
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(`OTP send to ${signupDetails.email}`);
                    setSpinSingUpLoading(false);
                    setIsOTPSend(!isOTPSend);
                }
                else {
                    toast.error(json.message);
                    setSpinSingUpLoading(false);
                }

            }
            catch (err) {
                toast.warn("Internal Server Error");
                setSpinSingUpLoading(false);
            }

        }
        else if (isOTPSend && signupDetails.otp !== "") {
            try {
                setSpinSingUpLoading(true);
                const response = await fetch(apiList.verifyotp, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: signupDetails.email, otp: signupDetails.otp })
                });

                const json = await response.json();
                if (json.success) {
                    toast.success("Otp verified successfully");
                    setSpinSingUpLoading(false);
                    navigate("/")
                }
                else {
                    toast.warn(json.message);
                    setSpinSingUpLoading(false);
                }

            }
            catch (err) {
                setSpinSingUpLoading(false);
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
                    <h2 className={`text-center text-2xl font-extrabold`}>Sign up for an account</h2>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className={`space-y-1`}>

                        <div>
                            <label htmlFor="name" className="block ml-1">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Your Name"
                                value={signupDetails.name}
                                onChange={(event) => { handleOnChange("name", event.target.value) }}
                            />
                        </div>

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
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Password"
                                value={signupDetails.password}
                                onChange={(event) => { handleOnChange("password", event.target.value) }}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />
                                }
                            </button>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block ml-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Re-enter the password"
                                value={signupDetails.confPassword}
                                onChange={(event) => { handleOnChange("confPassword", event.target.value) }}
                            />
                        </div>

                        <div>
                            <label htmlFor="otp" className="block ml-1">
                                OTP Verification
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="number"
                                autoComplete="otp"
                                required
                                disabled={!isOTPSend}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="****"
                                value={signupDetails.otp}
                                onChange={(event) => { handleOnChange("otp", event.target.value) }}
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2`}
                            onClick={handleLogin}
                        >
                            {spinSingUpLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                            {
                                isOTPSend ? <span>Verify and Create Account</span> : <span>Send OTP</span>
                            }
                        </button>
                    </div>
                </form>

                <div className='absolute -bottom-6 -left-8'>
                    <div className='w-28 h-28'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/016/717/556/small/man-reading-book-beside-bookshelf-free-png.png" alt="" className='w-full h-full' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StdSignup;