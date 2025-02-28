import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authContext from '../../context/auth/authContext';
import apiList from '../../libs/apiLists';

const ResetPass = () => {
  const context = useContext(authContext);
  const { setIsloggedin, setLinks, setUserProfile } = context;

  const [signupDetails, setSignupDetails] = useState({
    email: '',
    password: '',
    confPassword: '',
    otp: ''
  });

  let navigate = useNavigate();

  const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOTPSend, setIsOTPSend] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Reset Password - ML';
  }, []);

  const handleOnChange = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!signupDetails.email || !signupDetails.password || !signupDetails.confPassword) {
      toast.warn('Fill all the details carefully.');
      return;
    }

    if (signupDetails.password !== signupDetails.confPassword) {
      toast.warn('Confirm password do not match');
      return;
    }

    if (!isClicked) {
      if (!isOTPSend) {
        try {
          setSpinSingUpLoading(true);
          setIsClicked(true);
          const response = await fetch(apiList.forgotpassword, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupDetails)
          });

          const json = await response.json();
          if (json.success) {
            toast.success(json.message);
            setSpinSingUpLoading(false);
            setIsOTPSend(true);
            setIsClicked(false);
          } else {
            toast.error(json.message);
            setSpinSingUpLoading(false);
            setIsClicked(false);
          }
        } catch (err) {
          toast.warn(err.message);
          setSpinSingUpLoading(false);
          setIsClicked(false);
        }
      } else if (isOTPSend) {
        if (!signupDetails.otp) {
          return toast.warn('Please enter the otp ');
        }
        try {
          setSpinSingUpLoading(true);
          setIsClicked(true);
          const response = await fetch(apiList.resetpassword, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupDetails)
          });

          const json = await response.json();
          if (json.success) {
            localStorage.setItem("type", json.type);
            localStorage.setItem("authtoken", json.authtoken);
            localStorage.setItem("isallowed", json.isallowed);
            toast.success(json.message);
            setLinks(json.type);
            setUserProfile(json.type + "/profile")
            setIsloggedin(true);
            setSpinSingUpLoading(false);
            navigate("/");
          } else {
            toast.error(json.message);
            setSpinSingUpLoading(false);
            setIsClicked(false);
          }
        } catch (err) {
          toast.warn('Internal Server Error');
          setSpinSingUpLoading(false);
          setIsClicked(false);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-gray-700">
      <div
        className={`max-w-sm w-full space-y-2 shadow-lg shadow-gray-400 rounded-xl p-4 pb-8 bg-gray-200 relative`}
      >
        <div className="space-y-1" data-aos="zoom-in" data-aos-duration="500">
          <div className="flex justify-center">
            <div className="w-14 h-14 overflow-hidden rounded-full shadow-lg shadow-gray-600">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className={`text-center text-2xl font-extrabold`}>Reset Your Password</h2>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className={`space-y-2`}>
            <div>
              <label htmlFor="phone" className="block ml-1">
                Email
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email address"
                  className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border bg-white/50 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  value={signupDetails.email}
                  onChange={(event) => {
                    handleOnChange('email', event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block ml-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none bg-white/50 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter Password"
                value={signupDetails.password}
                onChange={(event) => {
                  handleOnChange('password', event.target.value);
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border bg-white/50 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Re-enter the password"
                value={signupDetails.confPassword}
                onChange={(event) => {
                  handleOnChange('confPassword', event.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <label htmlFor="otp" className="block ml-1">
                OTP Verification
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                autoComplete="otp"
                required
                disabled={!isOTPSend}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none bg-white/50 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="****"
                value={signupDetails.otp}
                onChange={(event) => {
                  handleOnChange('otp', event.target.value);
                }}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className={`text-center p-2 rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full flex items-center justify-center space-x-4`}
              onClick={handleLogin}
            >
              {isOTPSend ? <span>Verify OTP and change password</span> : <span>Send OTP</span>}
              {spinSingUpLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;