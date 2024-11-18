import React, { useContext, useEffect } from 'react';
import LibSeats from './LibSeats';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';

const LibOwner = () => {

    const context = useContext(authContext);
    const { invalidUser, loading, libraryDetails, setLibraryDetails, getLibOwner } = context;

    const navigate = useNavigate(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userType() !== "libowner") {
            invalidUser()
            navigate("/login")
            return;
        }
        if (!libraryDetails.ownername) {
            getLibOwner();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center mb-8'>{libraryDetails.libname}</h1>

                </div>

                {
                    loading ? <LibownerProfileAnim /> : <>
                        <LibSeats actSeats={libraryDetails.shifts[0].numberOfSeats} />
                    </>
                }


            </div>
        </div>
    )
}

export default LibOwner;