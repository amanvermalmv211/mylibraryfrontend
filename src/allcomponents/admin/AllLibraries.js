import React, { useEffect, useState } from 'react';
import { AllLibrariesAnim } from '../notificationmessage/SkeletonAnim';

const AllLibraries = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "All_Libraries - ML";
        setLoading(false);
        // getEbooks();
    }, []);

    // const [open, setOpen] = useState(false);
    // const [openDel, setOpenDel] = useState(false);
    // const [openUpdate, setOpenUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    // const getEbooks = async () => {
    //     try {
    //         const response = await fetch(apiList.getebooks, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         const json = await response.json();
    //         if (json.success) {
    //             setLoading(false);
    //         }
    //         else {
    //             toast.warn(json.message);
    //         }
    //     }
    //     catch (err) {
    //         toast.warn(`E-book : ${err.message}`);
    //     }

    // }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-8'>List Of All Libraries</h1>

                    {
                        loading ? <AllLibrariesAnim /> :
                            <div className='grid md:grid-cols-2 gap-4 lg:gap-8'>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((data) => {
                                        return <div key={data} className='flex rounded-md overflow-hidden border border-gray-300 '>
                                            <div className='bg-gray-300 w-2/5'></div>
                                            <div className='w-3/5 p-1 lg:p-2'>
                                                <div className='text-center md:text-xl mb-1 font-semibold'>Name Of Owner</div>
                                                <div>Saraswati Peace Library</div>
                                                <div>6306805527, 6306402081</div>
                                                <div>Active Students: 200</div>
                                                <div>Last Till: 12 January, 2024</div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                    }

                </div>

            </div>
        </div>
    )
}

export default AllLibraries;