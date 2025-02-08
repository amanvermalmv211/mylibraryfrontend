import React from 'react';
import signup from '../images/signup.svg';
import libsubs from '../images/libsubs.svg';
import searchengines from '../images/searchengines.svg';

const GuidePage = () => {
    return (
        <div className="text-gray-700">

            {/* Header Section */}
            <header className="py-6">
                <div className="mx-auto md:text-center">
                    <h1 className="text-3xl md:text-5xl font-bold">How myLibrary Works</h1>
                    <p className="mt-2 text-lg">An easy guide to discover, subscribe, and access the best library for your needs.</p>
                </div>
            </header>

            {/* Main Content Section */}
            <main className="py-2">
                <div className="max-w-screen-lg mx-auto space-y-10">

                    {/* Search for Libraries Section */}
                    <section className="bg-white rounded-lg shadow-md overflow-hidden p-2">
                        <div className="flex max-md:flex-col items-center">
                            <img
                                src={searchengines}
                                alt="Search Libraries"
                                className="w-full h-full object-cover md:w-1/3"
                            />
                            <div className='w-full px-3'>
                                <h2 className="text-2xl font-semibold text-blue-600">1. Search for Libraries</h2>
                                <p className="mt-2 md:text-lg">
                                    Finding a library that suits your needs is easy! Simply follow these steps:
                                </p>
                                <ul className="mt-2 list-disc space-y-2 ml-4 md:text-lg">
                                    <li><strong>Use the Search Bar</strong>: Enter your desired location, or library name.</li>
                                    <li><strong>Explore the Libraries</strong>: Browse the list of libraries with descriptions, and near by location.</li>
                                    <li><strong>View more details</strong>: Click on "View and request" button to get to know more about an particular library.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Subscribe to a Library Section */}
                    <section className="bg-white rounded-lg shadow-md overflow-hidden p-2">
                        <div className="flex max-md:flex-col md:flex-row-reverse  items-center">
                            <img
                                src={signup}
                                alt="Search Libraries"
                                className="w-full h-full object-cover md:w-1/3"
                            />
                            <div className='w-full px-3'>
                                <h2 className="text-2xl font-semibold text-blue-600">2. Subscribe to a Library</h2>
                                <p className="mt-2 md:text-lg">
                                    Once you've found the perfect library, subscribing is quick and simple:
                                </p>
                                <ul className="mt-2 list-disc space-y-2 ml-4 md:text-lg">
                                    <li><strong>Choose a Subscription Plan</strong>: Select a plan based on your desired duration.</li>
                                    <li><strong>Sign Up</strong>: Fill in your details and create an account to manage your subscriptions.</li>
                                    <li><strong>Payment</strong>: Pay directly to the library owner as per their payment terms.</li>
                                </ul>
                            </div>
                        </div>
                    </section>


                    {/* Access the Facilities Section */}
                    <section className="bg-white rounded-lg shadow-md overflow-hidden p-2">
                        <div className="flex max-md:flex-col items-center">
                            <img
                                src={libsubs}
                                alt="Search Libraries"
                                className="w-full h-full object-cover md:w-1/3"
                            />
                            <div className='w-full px-3'>
                                <h2 className="text-2xl font-semibold text-blue-600">3. Access the Facilities</h2>
                                <p className="mt-2 md:text-lg">
                                    After subscribing, it's time to enjoy the library’s facilities:
                                </p>
                                <ul className="mt-2 list-disc space-y-2 ml-4 md:text-lg">
                                    <li><strong>Book Your Seat</strong>: Reserve a desk or spot in the library based on your preferred time.</li>
                                    <li><strong>Use the Amenities</strong>: Enjoy services such as AC rooms, desk lamps, newspapers, and Wi-Fi.</li>
                                    <li><strong>Engage with the Community</strong>: Make use of the peaceful atmosphere for studies or work.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

        </div>
    );
};

export default GuidePage;