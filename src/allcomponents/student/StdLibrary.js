import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import RequestView from './RequestView';
import LibraryDetails from './LibraryDetails';

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

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700'>
                <div className="mb-6">
                    <LibraryDetails />
                </div>

                <RequestView />
            </div>
        </div>
    )
}

export default StdLibrary;