import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { Link, useNavigate } from 'react-router-dom';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';

const LibraryDetails = () => {

    const context = useContext(authContext);
    const { studentDetails } = context;

    const navigate = useNavigate(null);

    const handleReserveAgain = async (libraryId) => {
        try {
            const response = await fetch(apiList.getLibraryAgain + `/${libraryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                navigate("/reserve-seat", { state: json.data });
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`Std: ${err.message}`);
        }
    }

    return (
        <div>
            {
                studentDetails._id &&
                <div className="mt-4 text-gray-700">
                    {
                        studentDetails.subscriptionDetails.length > 0 &&
                        <h1 className='text-2xl md:text-4xl font-bold text-center mb-8'>Library Subscription</h1>
                    }
                    <div className="flex max-lg:flex-col max-lg:space-y-12 items-center justify-center lg:space-x-12">
                        {studentDetails.subscriptionDetails.map((studentDetails, idx) => (
                            <div key={idx} className='border rounded-md overflow-hidden bg-white shadow-md w-full lg:max-w-screen-sm'>
                                <div className='bg-gray-300'>
                                    <iframe
                                        title='addloc'
                                        src={studentDetails.libraryId.googlemap}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className='w-full h-60'></iframe>
                                </div>
                                <div className='p-2 max-md:text-sm'>
                                    <h2 className='font-semibold text-lg'>{studentDetails.libraryId.libname}</h2>
                                    <p>Subscribed for seat number: {Number(studentDetails.idxSeatSelected) + 1} of shift: {Number(studentDetails.idxShift) + 1} on floor: {studentDetails.idxFloor}</p>

                                    <p>Subscription Date: {new Date(studentDetails.subscriptionDate).getDate()}/{Number(new Date(studentDetails.subscriptionDate).getMonth()) + 1}/{new Date(studentDetails.subscriptionDate).getFullYear()}</p>

                                    <p className={`${new Date() > new Date(studentDetails.expiryDate) ? "text-red-500" : "text-gray-700"}`}>Subscription End Date: {new Date(studentDetails.expiryDate).getDate()}/{Number(new Date(studentDetails.expiryDate).getMonth()) + 1}/{new Date(studentDetails.expiryDate).getFullYear()}</p>

                                    <p>Contact Details: <Link to={`tel:+91${studentDetails.libraryId.contactnum}`}>{studentDetails.libraryId.contactnum}</Link>, <Link to={`tel:+91${studentDetails.libraryId.libcontactnum}`}>{studentDetails.libraryId.libcontactnum}</Link>
                                    </p>
                                    {new Date() > new Date(studentDetails.expiryDate) && <button
                                        className='block w-full mt-2 py-2 text-center text-white bg-blue-700 rounded-md hover:bg-blue-800' onClick={() => { handleReserveAgain(studentDetails.libraryId._id) }}>
                                        Reserve Seat Again
                                    </button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}

export default LibraryDetails;