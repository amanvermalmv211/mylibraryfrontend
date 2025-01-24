import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';

const LibraryDetails = () => {

    const context = useContext(authContext);
    const { studentDetails } = context;

    return (
        <div>
            {
                studentDetails._id &&
                <div className="mt-4 text-gray-700">
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Library Subscriptions</h1>
                    <div className="flex flex-col md:flex-row items-center justify-center max-md:space-y-4 md:space-x-4">
                        {studentDetails.subscriptionDetails.map((studentDetails, idx) => (
                            <div key={idx} className="border rounded-lg overflow-hidden shadow-md bg-gray-50 w-full flex">
                                <div className='bg-gray-300 w-full'>
                                    <iframe
                                        title='addloc'
                                        src={studentDetails.libraryId.googlemap}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className='w-full h-40'></iframe>
                                </div>

                                <div className='w-full p-1'>
                                    <h1 className='text-lg font-semibold text-center'>{studentDetails.libraryId.libname}</h1>
                                    <p className="text-gray-500">Contact: {studentDetails.libraryId.contactnum}, {studentDetails.libraryId.libcontactnum}</p>
                                    <p className="text-gray-500">Subscription Date: {new Date(studentDetails.subscriptionDate).getDate()}/{Number(new Date(studentDetails.subscriptionDate).getMonth()) + 1}/{new Date(studentDetails.subscriptionDate).getFullYear()}</p>
                                    <p className="text-gray-500">Subscription End Date: {new Date(studentDetails.expiryDate).getDate()}/{Number(new Date(studentDetails.expiryDate).getMonth()) + 1}/{new Date(studentDetails.expiryDate).getFullYear()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {/* <div className='border rounded-md overflow-hidden bg-white shadow-md'>
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
            </div> */}

        </div>
    )
}

export default LibraryDetails;