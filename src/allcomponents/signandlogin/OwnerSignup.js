import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import signupValidation from '../../libs/Validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputBox from '../notificationmessage/InputBox';

const OwnerSignup = () => {

    const [signupDetails, setSignupDetails] = useState({
        name: "",
        contactnum: "",
        localarea: "",
        city: "",
        state: "",
        pin: "",
        email: "",
        password: "",
        confPassword: "",
        otp: "",
        type: "libowner"
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
            console.log(signupDetails);
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
        <div className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className={`w-full max-lg:max-w-sm lg:w-10/12 space-y-4 shadow-lg shadow-gray-400 rounded-xl p-2 pb-8 bg-gray-200 relative flex items-center justify-center max-lg:flex-col flex-row`}>
                <div className='space-y-1 w-full lg:w-2/5 flex items-center justify-center flex-col' data-aos="zoom-in" data-aos-duration="500">
                    <div className="flex justify-center">
                        <div className="w-14 h-14 overflow-hidden rounded-full shadow-lg shadow-gray-600">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className={`text-center text-2xl font-extrabold pt-2`}>Sign up as Library Owner</h2>
                    <div className='text-sm lg:hidden'>Already have an account? <Link to="/login" className='text-blue-700 underline font-semibold'>Login</Link> </div>
                    <div className='hidden lg:flex flex-col w-full h-60 items-center justify-center'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/016/717/556/small/man-reading-book-beside-bookshelf-free-png.png" alt="" className='w-full h-full object-contain' />
                        <div className='text-sm'>Already have an account? <Link to="/login" className='text-blue-700 underline font-semibold'>Login</Link> </div>
                    </div>
                </div>

                <form className="space-y-6 w-full lg:w-3/5" onSubmit={(e) => e.preventDefault()}>
                    <div className={`space-y-1`}>

                        <div className='flex flex-col lg:flex-row items-center justify-center lg:space-x-1.5'>
                            <InputBox name="Name" id="name" type="text" value={signupDetails.name} placeholder="Enter your name" handleOnChange={handleOnChange} />

                            <InputBox name="Contact Number" id="contactnum" type="text" value={signupDetails.contactnum} placeholder="Enter your contact number" handleOnChange={handleOnChange} />
                        </div>


                        <div className='flex items-center justify-center space-x-1.5'>
                            <InputBox name="Local Area" id="localarea" type="text" value={signupDetails.localarea} placeholder="Mention your local area" handleOnChange={handleOnChange} />

                            <InputBox name="City" id="city" type="text" value={signupDetails.city} placeholder="Enter your city" handleOnChange={handleOnChange} />
                        </div>

                        <div className='flex items-center justify-center space-x-1.5'>
                            <InputBox name="State" id="state" type="text" value={signupDetails.state} placeholder="Enter you state" handleOnChange={handleOnChange} />

                            <InputBox name="PIN" id="pin" type="text" value={signupDetails.pin} placeholder="PIN Code of your area" handleOnChange={handleOnChange} />
                        </div>

                        <div className='flex flex-col lg:flex-row items-center justify-center lg:space-x-1.5'>
                            <InputBox name="E-mail" id="email" type="email" value={signupDetails.email} placeholder="Enter your email address" handleOnChange={handleOnChange} />

                            <div className='relative w-full'>
                                <InputBox name="Password" id="password" type={showPassword ? 'text' : 'password'} value={signupDetails.password} placeholder="Enter password" handleOnChange={handleOnChange} />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row items-center justify-center lg:space-x-1.5'>

                            <InputBox name="Confirm Password" id="confPassword" type="password" value={signupDetails.confPassword} placeholder="Re-enter the password" handleOnChange={handleOnChange} />

                            <div className='w-full'>
                                <label htmlFor="otp" className="px-1 text-sm">
                                    OTP Verification
                                </label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="number"
                                    autoComplete="otp"
                                    required
                                    disabled={!isOTPSend}
                                    className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="****"
                                    value={signupDetails.otp}
                                    onChange={(event) => { handleOnChange("otp", event.target.value) }}
                                />
                            </div>
                        </div>



                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group mx-auto relative w-full lg:w-4/6 flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2`}
                            onClick={handleLogin}
                        >
                            {
                                isOTPSend ? <span>Verify and Create Account</span> : <span>Send OTP</span>
                            }
                            {spinSingUpLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                        </button>
                    </div>
                </form>

                <div className='absolute -bottom-6 -left-8 lg:hidden'>
                    <div className='w-28 h-28'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/016/717/556/small/man-reading-book-beside-bookshelf-free-png.png" alt="" className='w-full h-full' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OwnerSignup;