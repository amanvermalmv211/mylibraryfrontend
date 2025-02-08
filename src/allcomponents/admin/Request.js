import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestLibAnim } from '../notificationmessage/SkeletonAnim';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Request = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Request - ML";
        getRequests();
    }, []);

    const navigate = useNavigate(null);

    const [loading, setLoading] = useState(false);
    const [edtLoading, setEdtLoading] = useState(false);
    const [allLib, setAllLib] = useState([]);
    const [allEditors, setAllEditors] = useState([]);

    const handleInitLib = (data) => {
        navigate("/initlib", { state: data });
    }

    const initEditor = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(apiList.initeditor + `/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setAllEditors(allEditors.filter((data) => { return data._id !== id }));
                toast.success(json.message)
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`Admin Req. Editor: ${err.message}`);
        }
        setLoading(false);
    }

    const getEdtRequests = async () => {
        setEdtLoading(true);
        try {
            const response = await fetch(apiList.getedtrequests, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setAllEditors(json.data);
                toast.success(json.message)
            }
            else {
                toast.warn(json.message);
            }
            setEdtLoading(false);
        }
        catch (err) {
            toast.warn(`Admin Req. Editor: ${err.message}`);
            setEdtLoading(false);
        }
    }

    const getRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiList.getlibrequests, {
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
                toast.success(json.message)
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`Admin Req. Lib: ${err.message}`);
        }
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28 text-gray-700'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-8'>Requests To Join Us</h1>

                    <button className='block w-64 m-4 py-2 text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 mx-auto' onClick={() => getEdtRequests()}>Get Editor's Requests
                        {edtLoading && <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2 mb-1" />}
                    </button>

                    {
                        loading ? <RequestLibAnim /> :
                            <div className='grid md:grid-cols-3 gap-4'>
                                {
                                    allLib.map((data, idx) => {
                                        return <div key={idx} className='rounded-md overflow-hidden border border-gray-300 cursor-pointer' onClick={() => { handleInitLib(data) }}>
                                            <div className='text-center lg:text-xl font-semibold bg-blue-600 text-white'>{data.ownername}</div>
                                            <div className='max-lg:text-sm p-1'>
                                                <div>{data.libname}</div>
                                                <div onClick={(e) => (e.stopPropagation())} className='inline-block'>Contact No: <Link to={`tel:+91${data.contactnum}`}>{data.contactnum}</Link></div>
                                                <div>{data.localarea} {data.city}, {data.state} {data.pin}</div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                    }
                    {
                        !loading && allLib.length === 0 && <>
                            <div className='h-96 flex items-center justify-center'>
                                <div className='font-bold text-2xl md:text-4xl text-center'>There is no requests for the approval!</div>
                            </div>
                        </>
                    }

                    {
                        !edtLoading && allEditors.length > 0 && <>
                            <h1 className='text-2xl md:text-4xl font-bold text-center mb-8'>Requests By Editor</h1>
                            <div className='grid md:grid-cols-3 gap-4'>
                                {
                                    allEditors.map((data, idx) => {
                                        return <div key={idx} className='rounded-md overflow-hidden border border-gray-300 cursor-pointer'>
                                            <div className='text-center lg:text-xl font-semibold bg-blue-600 text-white'>{data.name}</div>
                                            <div className='max-lg:text-sm p-1'>
                                                <div onClick={(e) => (e.stopPropagation())} className='inline-block'>Contact No: <Link to={`tel:+91${data.contactnum}`}>{data.contactnum}</Link></div>

                                                <button className='block w-64 m-1 p-1 text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 mx-auto' onClick={() => initEditor(data._id)}>Allowed Editor
                                                    {edtLoading && <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2 mb-1" />}
                                                </button>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </>
                    }

                </div>

            </div>
        </div>
    )
}

export default Request;