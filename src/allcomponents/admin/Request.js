import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestLibAnim } from '../notificationmessage/SkeletonAnim';

const Request = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Request - ML";
        setLoading(false);
        // getRequests();
        setAllLib(allLib);
        // eslint-disable-next-line
    }, []);

    const navigate = useNavigate(null);

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
            address: "Tedhi Bazar Ghazipur"
        },
        {
            name: "Aman",
            libName: "Sarda Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            address: "Tedhi Bazar Ghazipur"
        },
        {
            name: "Aman Verma",
            libName: "Bhawani Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            address: "Tedhi Bazar Ghazipur"
        },
        {
            name: "Aman",
            libName: "Sarswati Library",
            contacNum: "6306805527",
            emgcontactnum: "9455333762",
            address: "Tedhi Bazar Ghazipur"
        }
    ]);

    const handleInitLib = () =>{
        navigate("/initlib");
    }

    // const getRequests = async () => {
    //     try {
    //         const response = await fetch(apiList.gerequests, {
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
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-8'>Requests To Join Us</h1>

                    {
                        loading ? <RequestLibAnim /> :
                            <div className='grid md:grid-cols-3 gap-4'>
                                {
                                    allLib.map((data, idx) => {
                                        return <div key={idx} className='rounded-md overflow-hidden border border-gray-300 cursor-pointer' onClick={handleInitLib}>
                                            <div className='text-center lg:text-xl font-semibold bg-blue-600 text-white'>{data.name}</div>
                                            <div className='max-lg:text-sm p-1'>
                                                <div>{data.libName}</div>
                                                <div>Contact No: <Link to={`tel:+91${data.contacNum}`}>{data.contacNum}</Link>, <Link to={`tel:+91${data.emgcontactnum}`}>{data.emgcontactnum}</Link></div>
                                                <div>{data.address}</div>
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

export default Request;