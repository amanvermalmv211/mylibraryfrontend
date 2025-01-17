import React, { useContext, useEffect, useState } from 'react';
import LibSeats from './LibSeats';
import authContext from '../../context/auth/authContext';
import { getEndTime, getStTime, userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';
import { NotAllowed, PreviewModal } from '../notificationmessage/Modal';
import { BiEdit } from 'react-icons/bi';
import { toast } from 'react-toastify';
import LibraryPreview from '../notificationmessage/LibraryPreview';
import { TbLibrary } from 'react-icons/tb';

const LibOwner = () => {

    const context = useContext(authContext);
    const { invalidUser, loading, libraryDetails, getLibOwner } = context;

    const navigate = useNavigate(null);
    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [idxFloor, setIdxFloor] = useState(0);
    const [idxShift, setIdxShift] = useState(0);
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
        window.scrollTo(0, 0);
        if (open || openPreview) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [open, openPreview]);

    useEffect(() => {
        if (libraryDetails.floors && libraryDetails.floors[0].shifts.length > 0) {
            setactSeats(libraryDetails.floors[0].shifts[0].numberOfSeats);
        }
    }, [libraryDetails]);

    const handleFloorSectorChange = (e) => {
        setIdxFloor(e.target.value);
        setIdxShift(0);
        setactSeats(libraryDetails.floors[Number(e.target.value)].shifts[0].numberOfSeats);
    };

    const handleSeatSectorChange = (e) => {
        const selectedIdx = e.target.value;
        setIdxShift(selectedIdx);
        if (libraryDetails.floors[idxFloor].shifts[selectedIdx]) {
            setactSeats(libraryDetails.floors[idxFloor].shifts[selectedIdx].numberOfSeats);
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
                </div>

                {loading ? (
                    <LibownerProfileAnim />
                ) : libraryDetails.floors && libraryDetails.floors[0].shifts.length > 0 ? (
                    <>
                        <div className='flex items-center justify-around my-4 space-x-4'>
                            <div className='w-full md:w-60'>
                                <label htmlFor="shifts" className='ml-1 text-sm'>Select Floor</label>
                                <select
                                    name="shifts"
                                    id="shifts"
                                    className="rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    onChange={(e) => handleFloorSectorChange(e)}
                                    value={idxFloor}
                                >
                                    {libraryDetails.floors.map((_, idx) => (
                                        <option key={idx} value={idx}>
                                            Floor {idx}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='w-full md:w-60'>
                                <label htmlFor="shifts" className='ml-1 text-sm'>Select Shift</label>
                                <select
                                    name="shifts"
                                    id="shifts"
                                    className="rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    onChange={(e) => handleSeatSectorChange(e)}
                                    value={idxShift}
                                >
                                    {libraryDetails.floors[idxFloor].shifts.map((data, idx) => (
                                        <option key={idx} value={idx}>
                                            Slot {idx + 1} Price {data.price[0].discountPrice}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-hidden max-w-screen-sm mx-auto my-6 shadow-md">
                            <table className="table-fixed w-full text-left">
                                <tbody>
                                    <tr className="bg-blue-100 border">
                                        <th colSpan="2" className="py-2 px-4 text-blue-600 font-semibold text-center">
                                            Shift {Number(idxShift) + 1} of Floor {idxFloor}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Time Slot</th>
                                        <td className="py-2 px-4 border">{getStTime(libraryDetails.floors[idxFloor].shifts[idxShift])} - {getEndTime(libraryDetails.floors[idxFloor].shifts[idxShift])}</td>
                                    </tr>
                                    <tr className='bg-gray-100'>
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Boy's Seats</th>
                                        <td className="py-2 px-4 border">
                                            {
                                                libraryDetails.floors[idxFloor].shifts[idxShift].numberOfSeats.filter(
                                                    (seat) => seat.gender === "boy"
                                                ).length
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Girl's Seats</th>
                                        <td className="py-2 px-4 border">
                                            {
                                                libraryDetails.floors[idxFloor].shifts[idxShift].numberOfSeats.filter(
                                                    (seat) => seat.gender === "girl"
                                                ).length
                                            }
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Price</th>
                                        <td className="py-2 px-4 border">
                                            <ul className="text-sm">
                                                {libraryDetails.floors[idxFloor].shifts[idxShift].price.map((priceOption, index) => (
                                                    <li key={index} className="mb-1">
                                                        <div className='inline font-semibold mr-0.5'>*</div>
                                                        <span>{priceOption.duration}</span>{" "}
                                                        <span className="text-green-600">₹{priceOption.discountPrice}</span>{" "}
                                                        <span className="text-xs text-red-500 line-through">₹{priceOption.actualPrice}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <LibSeats actSeats={actSeats} hadleSeatGender={handleOpenSeatDetails} />

                        <div className='flex max-md:flex-col max-md:space-y-4 items-center justify-around md:space-x-4 mt-4'>
                            <PreviewModal open={openPreview} setOpen={setOpenPreview}>
                                <div className='my-4'>
                                    <LibraryPreview library={libraryDetails} />
                                </div>
                            </PreviewModal>
                            <button
                                type="button"
                                className={`w-full md:w-72 py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1`}
                                onClick={() => { setOpenPreview(true) }}
                            >
                                <span>Preview Library Details</span>
                                <TbLibrary size={18} />
                            </button>
                            <button
                                type="submit"
                                className={`w-full md:w-72 py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1`}
                                onClick={handleEditLib}
                            >
                                <span>Edit Library Details</span> <BiEdit />
                            </button>
                        </div>
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