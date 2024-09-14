import React, { useEffect } from 'react'

const Results = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Results - ML";
    }, []);

    const linkName = ["Goveronment Jobs", "Other Applications", "Admit Card"];

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-8'>Goveronment Jobs, Appilications and Results</h1>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>

                        {
                            linkName.map((name, idx) => {
                                return <div className='border border-gray-300 rounded-xl overflow-hidden'>

                                    <h4 className='font-semibold text-xl text-center p-3 bg-blue-700 text-white'>{name}</h4>

                                    {
                                        data.map((data, idx) => {
                                            return <div className={`p-2 ${idx % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} `}>
                                                Goveronment jobs link
                                            </div>
                                        })
                                    }

                                    <footer className='bg-blue-400 hover:bg-blue-500 cursor-pointer p-1 text-center'>
                                        See More
                                    </footer>

                                </div>
                            })
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Results;