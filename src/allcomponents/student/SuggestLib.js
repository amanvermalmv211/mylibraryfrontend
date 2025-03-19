import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../context/auth/authContext';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';
import { Link, useNavigate } from 'react-router-dom';
import librarynotfound from '../images/librarynotfound.svg';
import { IoIosSearch } from 'react-icons/io';

const SuggestLib = () => {

    const context = useContext(authContext);
    const { studentDetails, searchLibRes, setSearchLibRes } = context;

    const navigate = useNavigate(null);

    const [noLib, setNoLib] = useState(false);

    useEffect(() => {
        if (studentDetails._id && studentDetails.subscriptionDetails.length === 0) {
            getRequests();
        }
        // eslint-disable-next-line
    }, [studentDetails]);

    const getRequests = async () => {
        try {
            const query = new URLSearchParams({ localarea: studentDetails.localarea, city: studentDetails.city }).toString();
            const response = await fetch(apiList.searchlib + `?${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (json.success) {
                setSearchLibRes(json.data);
            } else {
                setNoLib(true);
            }
        } catch (err) {
            toast.error(`Search Lib: ${err.message}`);
        }
    }

    return (
        <div>
            {
                (studentDetails._id && (studentDetails.subscriptionDetails.length === 0) && !noLib) &&
                <>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-2'>Libraries Around You!</h1>
                    <h1 className='text-xl md:text-2xl font-semibold text-center text-gray-700 mb-2'>Find best library and reserve your seat!</h1>

                    <div className="mb-10">
                        <Link to="/libraries" className="rounded-lg bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700 flex items-center justify-center space-x-2 w-60 mx-auto"><span>Search More Libraries</span> <IoIosSearch className='scale-150' /></Link>
                    </div>

                    <div className='grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3'>
                        {searchLibRes.map((data, idx) => (
                            <div key={idx} className='border rounded-md overflow-hidden bg-white shadow-md'>
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
                                        onClick={() => navigate("/reserve-seat", { state: data })}>
                                        View and Request Seat
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }

            {
                noLib &&
                <div className='w-80 h-full mx-auto my-10'>
                    <p className='text-2xl font-semibold text-center'>Oops! There is no Library around you</p>
                    <img src={librarynotfound} alt='Search Library' className='w-full h-full' />
                    <div className="mb-10">
                        <Link to="/libraries" className="rounded-lg bg-blue-600 px-16 py-3 font-semibold text-white hover:bg-blue-700 flex items-center justify-center space-x-2"><span>Click to Search</span> <IoIosSearch className='scale-150' /></Link>
                    </div>
                </div>
            }

        </div>
    )
}

export default SuggestLib;