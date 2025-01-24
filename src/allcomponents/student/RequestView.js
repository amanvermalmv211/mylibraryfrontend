import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../context/auth/authContext';
import { PreviewModal } from '../notificationmessage/Modal';
import { toast } from 'react-toastify';
import { TiCancel } from 'react-icons/ti';
import { GiCrossMark } from 'react-icons/gi';
import apiList from '../../libs/apiLists';

const RequestView = () => {

    const context = useContext(authContext);
    const { studentDetails } = context;

    const [openDelete, setOpenDelete] = useState(false);
    const [allRequests, setAllRequests] = useState([]);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        if (openDelete) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [openDelete]);

    useEffect(() => {
        if (studentDetails._id) {
            getRequests();
        }
        // eslint-disable-next-line
    }, [studentDetails]);

    const deleteRequest = async (data) => {

        setSelectedData(data);

        if (!openDelete) {
            setOpenDelete(true);
            return;
        }

        try {
            const response = await fetch(apiList.deleterequest + `/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                toast(json.message);
                setAllRequests(allRequests.filter((request) => { return request._id !== data._id }));
            }
            else {
                toast.warn(json.message);
            }
            setOpenDelete(false);
        }
        catch (err) {
            toast.warn(`Std: ${err.message}`);
            setOpenDelete(false);
        }
    }

    const getRequests = async () => {
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
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div>
            {
                studentDetails._id &&
                <PreviewModal open={openDelete} setOpen={setOpenDelete}>
                    {
                        selectedData.studentId && <div className='bg-gray-100 rounded-md text-center max-w-md p-2 mx-auto'>
                            <h1>Are you sure?</h1>
                            <p>You want to delete the request for seat number: {Number(selectedData.idxSeatSelected) + 1} in shift: {Number(selectedData.idxShift) + 1} of floor: {selectedData.idxFloor} at {selectedData.libraryId.libname}</p>

                            <div className='flex items-center justify-around space-x-4 mt-4'>
                                <button
                                    type="button" className={`w-full p-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                                    onClick={() => { setOpenDelete(false) }}
                                >
                                    <span>Cancel <TiCancel size={18} className='inline-block mb-0.5' /></span>
                                </button>
                                <button
                                    type="button" className={`w-full p-1 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                                    onClick={() => { deleteRequest(selectedData) }}
                                >
                                    <span>Delete <GiCrossMark size={18} className='inline-block' /></span>
                                </button>
                            </div>
                        </div>
                    }
                </PreviewModal>
            }

            {allRequests.length > 0 && <>
                <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Your Requests</h1>
                <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {allRequests.map((data, idx) => {
                        return <div key={idx} className='bg-gray-100 shadow-lg rounded-md overflow-hidden'>
                            <div className='text-center border bg-blue-300 flex items-center justify-between px-3 text-lg font-semibold'>
                                <span>{data.libraryId.libname}</span>
                                <span> <span className='font-normal'>Status: </span><span className={`${data.status === "Pending" ? "text-yellow-300" : "text-red-500"}`}>{data.status}</span></span>
                            </div>
                            <div className='my-2 text-center px-1'>
                                Your request for Seat number: {Number(data.idxSeatSelected) + 1} in shift: {Number(data.idxShift) + 1} of floor: {data.idxFloor} is {data.status}

                                <div>
                                    <button
                                        type="button"
                                        className={`w-60 p-1 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm mt-2`}
                                        onClick={() => { deleteRequest(data) }}
                                    >
                                        <span>Delete Request</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    })}
                </div>
            </>
            }

        </div>
    )
}

export default RequestView;