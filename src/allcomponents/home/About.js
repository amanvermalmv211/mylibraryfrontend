import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "About Us - ML";
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-12">
            <div className="max-w-4xl text-center pt-16">
                <h1 className="text-3xl font-bold md:text-5xl text-blue-600 mb-6">Welcome to meriLibrary</h1>
                <p className="text-lg text-gray-700 leading-relaxed max-md:text-justify">
                    merilibrary.in is a platform that bridges the gap between students and library owners, providing a seamless experience for both. Our mission is to create a hassle-free environment for students to find and subscribe to libraries while enabling library owners to manage their spaces efficiently.
                </p>
            </div>

            {/* Features Section */}
            <div className="mt-12 grid md:grid-cols-2 gap-6 w-full max-w-screen-lg">
                <div className="bg-white p-4 pl-2 rounded-2xl shadow-lg flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">For Students</h2>
                    <ul className="text-gray-600">
                        <li>📍 Find nearby libraries with ease</li>
                        <li>📚 Check seat availability & subscription plans</li>
                        <li>⏳ Get timely renewal reminders</li>
                        <li>🔔 Stay updated with library notifications</li>
                    </ul>
                </div>

                <div className="bg-white p-4 pl-2 rounded-2xl shadow-lg flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">For Library Owners</h2>
                    <ul className="text-gray-600">
                        <li>🏢 List & manage your library effortlessly</li>
                        <li>📊 Track student subscriptions & seat bookings</li>
                        <li>💳 Manage pricing & subscription plans</li>
                        <li>📨 Get notified about expired subscriptions</li>
                    </ul>
                </div>
            </div>

            <section className="mt-12 text-gray-700">
                <h2 className="text-3xl font-semibold text-center">Why Choose MeriLibrary?</h2>
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                        <h4 className="text-xl font-semibold">Seamless Subscription Management</h4>
                        <p className="mt-2 text-lg">Automate student subscriptions and track expirations effortlessly.</p>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                        <h4 className="text-xl font-semibold">Real-Time Notifications</h4>
                        <p className="mt-2 text-lg">Get notified when a subscription is about to expire.</p>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                        <h4 className="text-xl font-semibold">User-Friendly Interface</h4>
                        <p className="mt-2 text-lg">Easy seat booking and transparent subscription details.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="mt-12 bg-blue-500 text-white p-6 rounded-2xl shadow-lg text-center max-w-3xl">
                <h2 className="text-2xl font-semibold">Join Us Today!</h2>
                <p className="text-lg mt-2">
                    Whether you're a student looking for the perfect study space or a library owner
                    aiming to streamline management, MeriLibrary.in has got you covered!
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
                </div>
            </div>
        </div>
    );
};

export default About;