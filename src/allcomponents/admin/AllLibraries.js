import React, { useEffect, useState } from 'react';
import { AllLibrariesAnim } from '../notificationmessage/SkeletonAnim';
import { Link } from 'react-router-dom';

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
    const [allLib, setAllLib] = useState([
        {
            name: "Aman Verma",
            libName: "Buddha Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            subscription: "12/12/2024",
            activeStd: "400",
            address: "Tedhi Bazar Ghazipur",
            googlemapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534.9340079649054!2d83.59583501112765!3d25.585213561240565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399201d9084b7745%3A0x85dff36e407107e4!2sHHPW%2B375%2C%20Tedi%20Bazar%2C%20Ghazipur%2C%20Rauja%20Shahabuddin%2C%20Uttar%20Pradesh%20233001!5e0!3m2!1sen!2sin!4v1728010089974!5m2!1sen!2sin"
        },
        {
            name: "Aman Verma",
            libName: "Buddha Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            subscription: "12/12/2024",
            activeStd: "400",
            address: "Tedhi Bazar Ghazipur",
            googlemapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534.9340079649054!2d83.59583501112765!3d25.585213561240565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399201d9084b7745%3A0x85dff36e407107e4!2sHHPW%2B375%2C%20Tedi%20Bazar%2C%20Ghazipur%2C%20Rauja%20Shahabuddin%2C%20Uttar%20Pradesh%20233001!5e0!3m2!1sen!2sin!4v1728010089974!5m2!1sen!2sin"
        },
        {
            name: "Aman Verma",
            libName: "Buddha Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            subscription: "12/12/2024",
            activeStd: "400",
            address: "Tedhi Bazar Ghazipur",
            googlemapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534.9340079649054!2d83.59583501112765!3d25.585213561240565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399201d9084b7745%3A0x85dff36e407107e4!2sHHPW%2B375%2C%20Tedi%20Bazar%2C%20Ghazipur%2C%20Rauja%20Shahabuddin%2C%20Uttar%20Pradesh%20233001!5e0!3m2!1sen!2sin!4v1728010089974!5m2!1sen!2sin"
        },
        {
            name: "Aman Verma",
            libName: "Buddha Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            subscription: "12/12/2024",
            activeStd: "400",
            address: "Tedhi Bazar Ghazipur",
            googlemapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d534.9340079649054!2d83.59583501112765!3d25.585213561240565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399201d9084b7745%3A0x85dff36e407107e4!2sHHPW%2B375%2C%20Tedi%20Bazar%2C%20Ghazipur%2C%20Rauja%20Shahabuddin%2C%20Uttar%20Pradesh%20233001!5e0!3m2!1sen!2sin!4v1728010089974!5m2!1sen!2sin"
        }
    ]);

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
                                    allLib.map((data, idx) => {
                                        return <div key={idx} className='flex rounded-md overflow-hidden border border-gray-300 '>
                                            <div className='bg-gray-300 w-2/5'>
                                                <iframe title='addloc' src={data.googlemapLink} loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-full'></iframe>
                                            </div>
                                            <div className='w-3/5 p-1 lg:p-2'>
                                                <div className='text-center md:text-xl font-semibold'>{data.name}</div>
                                                <div className='max-lg:text-sm'>
                                                    <div>{data.libName}</div>
                                                    <div><Link to={`tel:+91${data.contacNum}`}>{data.contacNum}</Link>, <Link to={`tel:+91${data.emgcontactnum}`}>{data.emgcontactnum}</Link></div>
                                                    <div>Active Students: {data.activeStd}</div>
                                                    <div>Last Till: {data.subscription}</div>
                                                    <div>{data.address}</div>
                                                </div>
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