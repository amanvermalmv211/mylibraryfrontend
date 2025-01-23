import React, { useContext, useEffect, useState } from 'react';
import apiList from '../../libs/apiLists';
import authContext from '../../context/auth/authContext';
import { toast } from 'react-toastify';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';

const StdLibrary = () => {

    const navigate = useNavigate(null);
    const context = useContext(authContext);
    const { studentDetails, getStudent, invalidUser } = context;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "MyLibrary - ML";
        if (userType() !== "student") {
            invalidUser();
            navigate("/login")
            return;
        }

        if (!studentDetails.name) {
            getStudent();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (studentDetails._id) {
            getRequests();
        }
        // eslint-disable-next-line
    }, [studentDetails]);

    const [loading, setLoading] = useState(false);
    const [allRequests, setAllRequests] = useState([]);

    const getRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiList.getrequest + `/${studentDetails._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setAllRequests(json.data);
                setLoading(false);
            }
            else {
                toast.warn(json.message);
                setLoading(false);
            }
        }
        catch (err) {
            toast.warn(`LibOwner Req: ${err.message}`);
        }
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700'>
                <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Library Details</h1>
                {
                    !loading && <div className='grid grid-flow-col grid-cols-3 gap-4'>
                        {allRequests.map((data, idx) => {
                            return <div key={idx} className='bg-gray-100 shadow-lg rounded-md overflow-hidden'>
                                <div className='text-center border bg-blue-300 flex items-center justify-between px-3 text-lg font-semibold'>
                                    <span>{data.libraryId.libname}</span>
                                    <span> <span className='font-normal'>Status: </span><span className={`${data.status === "Pending" ? "text-yellow-300" : "text-red-500"}`}>{data.status}</span></span>
                                </div>
                                <div className='my-2 text-center'>
                                    Your request for Seat number: {Number(data.idxSeatSelected) + 1} in shift: {Number(data.idxShift) + 1} of floor: {data.idxFloor} is {data.status}

                                </div>
                            </div>
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default StdLibrary;