import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';

const LibraryDetails = () => {

    const context = useContext(authContext);
    const { studentDetails } = context;

    return (
        <div>
            {
                studentDetails._id &&
                <>
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Subscription Details</h1>
                    <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            studentDetails.subscriptionDetails.map((detail, idx) => {
                                return <div key={idx}>
                                    <div>{detail.libraryId}</div>
                                    <div>{detail.subscriptionDate}</div>
                                    <div>{detail.expiryDate}</div>
                                </div>
                            })
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default LibraryDetails;