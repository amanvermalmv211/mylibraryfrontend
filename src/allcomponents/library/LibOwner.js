import React, { useContext, useEffect, useState } from 'react';
import LibSeats from './LibSeats';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';
import { NotAllowed } from '../notificationmessage/Modal';
import { BiEdit } from 'react-icons/bi';
import { toast } from 'react-toastify';

const LibOwner = () => {

    const context = useContext(authContext);
    const { invalidUser, loading, libraryDetails, getLibOwner } = context;

    const navigate = useNavigate(null);
    const [open, setOpen] = useState(false);
    // const [openSeatDetail, setOpenSeatDetail] = useState(false);
    const [idxSeatSelector, setIdxSeatSelector] = useState(0);
    const [actSeats, setactSeats] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userType() !== "libowner") {
            invalidUser()
            navigate("/login")
            return;
        }
        if (localStorage.getItem("isallowed") !== "true") {
            setOpen(true);
            return;
        }
        if (!libraryDetails.ownername) {
            getLibOwner();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (libraryDetails.shifts && libraryDetails.shifts.length > 0) {
            setactSeats(libraryDetails.shifts[0].numberOfSeats);
        }
    }, [libraryDetails]);

    const handleSeatSectorChange = (e) => {
        const selectedIdx = e.target.value;
        setIdxSeatSelector(selectedIdx);
        if (libraryDetails.shifts[selectedIdx]) {
            setactSeats(libraryDetails.shifts[selectedIdx].numberOfSeats);
        }
    };

    const handleOpenSeatDetails = (e) => {
        toast("this is to test the things")
    };

    const handleEditLib = () => {
        navigate("/editlibrary", { state: libraryDetails });
    }

    return (
        <div className="bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="pt-28 mb-4">
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 text-center">
                        {libraryDetails.libname || "Library Details"}
                    </h1>
                    <div className='text-center'>
                        <button onClick={handleEditLib} className='bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-md flex items-center mx-auto space-x-1'><span>Edit Details</span> <BiEdit/></button>
                    </div>
                </div>

                {loading ? (
                    <LibownerProfileAnim />
                ) : libraryDetails.shifts && libraryDetails.shifts.length > 0 ? (
                    <>
                        <div className='mb-4 max-w-sm mx-auto'>
                            <label htmlFor="shifts" className='ml-1 text-sm'>Select Shift</label>
                            <select
                                name="shifts"
                                id="shifts"
                                className="rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                onChange={(e) => handleSeatSectorChange(e)}
                                value={idxSeatSelector}
                            >
                                {libraryDetails.shifts.map((data, idx) => (
                                    <option key={idx} value={idx}>
                                        Slot {idx + 1} Price {data.discountPrice}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <LibSeats actSeats={actSeats} hadleSeatGender={handleOpenSeatDetails} />
                    </>
                ) : (
                    <LibownerProfileAnim />
                )}

                {open && (
                    <NotAllowed open={open} setOpen={setOpen} fromHeading="Currently you are not allowed!">
                        <p>May be you do not got verified by the admin</p>
                        <p>Our team will soon respond to you as soon as you get verified.</p>
                    </NotAllowed>
                )}
            </div>
        </div>
    );
}

export default LibOwner;