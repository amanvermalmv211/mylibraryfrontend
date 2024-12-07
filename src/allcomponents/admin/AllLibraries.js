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
                            <div className='grid md:grid-cols-2 gap-4 lg:gap-8'>
                                {
                                    allLib.map((data, idx) => {
                                        return <div key={idx} className='flex rounded-md overflow-hidden border border-gray-300 '>
                                            <div className='bg-gray-300 w-2/5'>
                                                <iframe title='addloc' src={data.googlemap} loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-full'></iframe>
                                            </div>
                                            <div className='w-3/5 p-1 lg:p-2 cursor-pointer' onClick={() => { navigate("/initlib", { state: data }); }}>
                                                <div className='text-center md:text-xl font-semibold'>{data.ownername}</div>
                                                <div className='max-lg:text-sm'>
                                                    <div>{data.libname}</div>
                                                    <div>{data.localarea} {data.city} {data.state} {data.pin}</div>
                                                    <div onClick={(e) => (e.stopPropagation())}><Link to={`tel:+91${data.contactnum}`}>{data.contactnum}</Link>, <Link to={`tel:+91${data.libcontactnum}`}>{data.libcontactnum}</Link></div>
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