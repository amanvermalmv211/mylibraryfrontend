import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <>
            {
                !localStorage.getItem("authtoken") && <div className="bg-gradient-to-r from-blue-400 to-pink-400 text-white my-8 py-16 px-2 text-center rounded-lg shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-bold">Start Your Library Journey Today!</h2>
                    <p className="mt-4 text-lg md:text-xl">
                        Find the perfect library, subscribe with ease, and enjoy a premium study environment.
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            to="/student/signup"
                            className="bg-white text-blue-600 font-semibold py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 w-44"
                        >
                            Sign Up as Student
                        </Link>

                        <Link
                            to="/owner/signup"
                            className="bg-white text-pink-500 font-semibold py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 w-44"
                        >
                            List Your Library
                        </Link>

                        <Link
                            to="/searchlibrary"
                            className="bg-transparent border-2 border-white py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 w-44"
                        >
                            Explore Libraries
                        </Link>
                    </div>

                    <p className="mt-6 text-sm">
                        Read{" "}
                        <Link to="/termsandconditions" className="underline font-semibold hover:text-gray-200">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            }
        </>
    );
};

export default CallToAction;