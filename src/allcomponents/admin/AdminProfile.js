import React, { useContext, useEffect, useState } from 'react'
import authContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { userType } from '../../libs/AllRoutes';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';

const AdminProfile = () => {

    const context = useContext(authContext);
    const { invalidUser } = context;

    const navigate = useNavigate(null);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userType() !== "admin") {
            invalidUser()
            navigate("/login")
            return;
        }

        document.title = "Admin - ML";

        getAdmin();
        // eslint-disable-next-line
    }, [])

    const getAdmin = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiList.getadmin, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setAdmin(json.data);
                setLoading(false);
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`adminProfile :  ${err.message}`);
        }

    }


    return (
        <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
            <div className='flex items-center justify-center px-4 md:px-8 h-screen'>

                {
                    loading ? <div className='border bg-blue-100 w-[30rem] h-48 rounded-lg flex flex-col items-center justify-center relative mt-32 animate-pulse'>

                        <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 rounded-md bg-gray-300'></div>

                        <div className='mb-4 bg-gray-300 p-3 w-40 rounded-md max-lg:mt-10'></div>
                        <div className='bg-gray-300 p-3 w-72 rounded-md'></div>

                    </div> : <div className='pt-28 max-lg:pt-40 w-full'>
                        <div className='border bg-blue-100 max-w-lg lg:h-48 mx-auto rounded-lg flex items-center justify-center p-2 relative'>

                            <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 overflow-hidden rounded-md border border-black bg-gray-200'>
                                <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg' alt='Profile Pic' className='w-full h-full object-cover' />
                            </div>

                            <div className='w-full py-4'>
                                <div className='flex items-center justify-center flex-col max-lg:pt-12 text-center mb-4'>
                                    <div className='text-xl lg:text-2xl font-semibold'>{admin.name}</div>
                                </div>

                                <div className='text-center'>
                                    <div>Here i will display the good tought</div>
                                </div>
                            </div>

                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default AdminProfile;