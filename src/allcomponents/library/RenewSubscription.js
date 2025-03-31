import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../context/auth/authContext';
import { monthsname } from '../../libs/AllRoutes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';

const RenewSubscription = (props) => {

    const context = useContext(authContext);
    const { activeStd, libraryDetails, getLibOwner } = context;

    const [spinLoading, setSpinLoading] = useState(false);

    useEffect(() => {
        if (!libraryDetails.ownername) {
            getLibOwner();
        }
        // eslint-disable-next-line
    }, [libraryDetails?.ownername])

    const handleSubscribeAgain = async () => {
        try {
            setSpinLoading(true);
            const response = await fetch(apiList.subscribe, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                getLibOwner();
                props.setOpenSubsExpired(false);
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`Subscribe : ${err.message}`);
        }
        setSpinLoading(false);
    };

    return (
        <>
            {
                libraryDetails.subscriptionDetails && <div className='max-w-sm mx-auto border border-blue-200 rounded-md bg-gradient-to-tl from-pink-200 to-blue-200 p-2 my-8 shadow-lg select-none'>
                    <h1 className='text-xl lg:text-2xl font-semibold text-center text-red-600 mb-2'>Subscription Expired!</h1>
                    <h1 className=''>Subscribe again for <span className='font-semibold'>free</span> to continue our services!</h1>
                    <div>
                        <p><span className='font-semibold'>Active Students : </span><span>{activeStd}</span></p>
                        <p><span className='font-semibold'>Subscription Date : </span><span>{new Date(libraryDetails.subscriptionDetails.subscriptionDate).getDate()} {monthsname[new Date(libraryDetails.subscriptionDetails.subscriptionDate).getMonth()]}, {new Date(libraryDetails.subscriptionDetails.subscriptionDate).getFullYear()}</span></p>

                        <p><span className='font-semibold'>Expiry Date : </span><span className='text-red-600'>{new Date(libraryDetails.subscriptionDetails.expiryDate).getDate()} {monthsname[new Date(libraryDetails.subscriptionDetails.expiryDate).getMonth()]}, {new Date(libraryDetails.subscriptionDetails.expiryDate).getFullYear()}</span></p>
                    </div>

                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-1.5 border border-transparent rounded-md bg-blue-700 hover:bg-blue-800 space-x-2 mt-4 text-white`}
                        onClick={handleSubscribeAgain}
                    >
                        <span>Subscribe for FREE <span className='text-sm text-red-500 line-through'>{Number(activeStd) * 5}</span></span>
                        {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
                    </button>

                </div>
            }
        </>
    )
}

export default RenewSubscription;