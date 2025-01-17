import React, { useEffect, useState } from 'react';
import { AllLibrariesAnim } from '../notificationmessage/SkeletonAnim';
import { Link, useNavigate } from 'react-router-dom';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';

const AllLibraries = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "All_Libraries - ML";
        getAllLibrary();
    }, []);

    const navigate = useNavigate(null);

    const [loading, setLoading] = useState(false);
    const [allLib, setAllLib] = useState([]);

    const getAllLibrary = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiList.getalllibrary, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setAllLib(json.data);
                setLoading(false);
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`All Libraries : ${err.message}`);
        }

    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-8'>List Of All Libraries</h1>

                    {
                        loading ? <AllLibrariesAnim /> :
                            <div className='grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3'>
                                {
                                    allLib.map((data, idx) => {
                                        return <div key={idx} className='border rounded-md overflow-hidden bg-white shadow-md'>
                                            <div className='bg-gray-300'>
                                                <iframe
                                                    title='addloc'
                                                    src={data.googlemap}
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    className='w-full h-40'></iframe>
                                            </div>
                                            <div className='p-2 max-md:text-sm'>
                                                <h2 className='font-semibold text-lg'>{data.libname}</h2>
                                                <p>{data.ownername}</p>
                                                <p>{data.localarea}, {data.city}, {data.state}</p>
                                                <p>
                                                    <Link to={`tel:+91${data.contactnum}`}>{data.contactnum}</Link>, <Link to={`tel:+91${data.libcontactnum}`}>{data.libcontactnum}</Link>
                                                </p>
                                                <button
                                                    className='block w-full mt-2 py-2 text-center text-white bg-blue-700 rounded-md hover:bg-blue-800'
                                                    onClick={() => navigate("/initlib", { state: data })}>
                                                    View Details
                                                </button>
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