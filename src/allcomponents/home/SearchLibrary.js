import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';
import { AllLibrariesAnim } from '../notificationmessage/SkeletonAnim';
import { Link, useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const SearchLibrary = () => {
    const context = useContext(authContext);
    const { searchLibRes, setSearchLibRes } = context;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Search Library - ML";
    }, []);

    const navigate = useNavigate(null);

    const [spinLoading, setSpinLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        libname: '',
        localarea: '',
        city: ''
    });

    const handleSearch = async () => {
        setSearchLibRes([]);
        const { libname, localarea, city } = searchParams;

        if (!libname.trim() && !localarea.trim() && !city.trim()) {
            toast.warning("Please fill at least one field to search!");
            return;
        }

        const genericTerms = ['library', 'lib', 'libr', 'libra', 'librar', 'ibrary', 'brary', 'rary', 'ary'];
        const sanitizedLibname = libname.trim().toLowerCase();

        if ((!localarea && !city) && (genericTerms.includes(sanitizedLibname) || genericTerms.some(term => sanitizedLibname.includes(term)))) {
            return toast.warning("Please provide a more specific library details.");
        }

        setSpinLoading(true);

        try {
            const query = new URLSearchParams(searchParams).toString();
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
                toast(json.message);
            }
        } catch (err) {
            toast.error(`Search Lib: ${err.message}`);
        } finally {
            setSpinLoading(false);
        }
    };

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700 min-h-screen'>
                <h1 className='mb-2 md:mb-4 text-4xl font-bold sm:text-5xl md:text-center'>Search Library Near You!</h1>
                <div className='border rounded-lg mx-auto max-w-screen-md p-2 bg-gray-200 shadow-md'>
                    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col items-center justify-center space-y-2 text-sm md:text-base'>
                        <div className='flex items-center justify-center space-x-2 w-full'>
                            <input type="text" placeholder="Local area" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full" value={searchParams.localarea} onChange={(e) => setSearchParams({ ...searchParams, localarea: e.target.value })} />

                            <input type="text" placeholder="City name" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full" value={searchParams.city} onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })} />
                        </div>

                        <div className='flex items-center justify-center space-x-2 w-full'>
                            <input type="text" placeholder="Library name" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full" value={searchParams.libname} onChange={(e) => setSearchParams({ ...searchParams, libname: e.target.value })} />

                            <button
                                onClick={handleSearch}
                                className='p-2 border border-transparent font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-2 w-full'>
                                <span>Get Libraries</span>
                                {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                            </button>
                        </div>
                    </form>
                </div>

                {spinLoading ? (
                    <div className='mt-6'><AllLibrariesAnim /></div>
                ) : (
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
                                        onClick={() => navigate("/details/library", { state: data })}>
                                        View and Request Seat
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchLibrary;