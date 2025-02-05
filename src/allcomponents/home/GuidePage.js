import React from 'react';

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
                <div className="max-w-screen-xl mx-auto space-y-10">

                    {/* Search for Libraries Section */}
                    <section className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex max-md:flex-col items-center md:space-x-3">
                            <img
                                src="https://wp.penguin.co.uk/wp-content/uploads/2020/11/number-books-main-image-1800x1200-1-768x512.jpg"
                                alt="Search Libraries"
                                className="w-full h-80 xl:h-60 object-cover md:w-1/3"
                            />
                            <div className='w-full p-2'>
                                <h2 className="text-2xl font-semibold text-blue-600">1. Search for Libraries</h2>
                                <p className="mt-2 md:text-lg">
                                    Finding a library that suits your needs is easy! Simply follow these steps:
                                </p>
                                <ul className="mt-2 list-disc space-y-2 mx-4 md:text-lg">
                                    <li><strong>Use the Search Bar</strong>: Enter your desired location, preferred facilities, or library name.</li>
                                    <li><strong>Filter Results</strong>: Filter by amenities like AC rooms, desk lamps, Wi-Fi access, and more.</li>
                                    <li><strong>Explore the Libraries</strong>: Browse the list of libraries with descriptions, photos, and facilities.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Subscribe to a Library Section */}
                    <section className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex max-md:flex-col md:flex-row-reverse items-center md:space-x-3">
                            <img
                                src="https://wp.penguin.co.uk/wp-content/uploads/2020/11/number-books-main-image-1800x1200-1-768x512.jpg"
                                alt="Search Libraries"
                                className="w-full h-80 xl:h-60 object-cover md:w-1/3"
                            />
                            <div className='w-full p-2'>
                                <h2 className="text-2xl font-semibold text-blue-600">2. Subscribe to a Library</h2>
                                <p className="mt-2 md:text-lg">
                                    Once you've found the perfect library, subscribing is quick and simple:
                                </p>
                                <ul className="mt-2 list-disc space-y-2 mx-4 md:text-lg">
                                    <li><strong>Choose a Subscription Plan</strong>: Select a plan based on your desired duration.</li>
                                    <li><strong>Sign Up</strong>: Fill in your details and create an account to manage your subscriptions.</li>
                                    <li><strong>Payment</strong>: Make a secure payment for the selected plan using our payment methods.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Access the Facilities Section */}
                    <section className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex max-md:flex-col items-center md:space-x-3">
                            <img
                                src="https://wp.penguin.co.uk/wp-content/uploads/2020/11/number-books-main-image-1800x1200-1-768x512.jpg"
                                alt="Search Libraries"
                                className="w-full h-80 xl:h-60 object-cover md:w-1/3"
                            />
                            <div className='w-full p-2'>
                                <h2 className="text-2xl font-semibold text-blue-600">3. Access the Facilities</h2>
                                <p className="mt-2 md:text-lg">
                                    After subscribing, it's time to enjoy the library’s facilities:
                                </p>
                                <ul className="mt-2 list-disc space-y-2 mx-4 md:text-lg">
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