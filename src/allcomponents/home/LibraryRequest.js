import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LibSeats from '../library/LibSeats';
import LibraryPreview from '../notificationmessage/LibraryPreview';
import { PreviewModal } from '../notificationmessage/Modal';
import { TbLibrary } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { getEndTime, getStTime, userType } from '../../libs/AllRoutes';
import authContext from '../../context/auth/authContext';
import { BiSolidBookmark } from 'react-icons/bi';
import { TiCancel } from 'react-icons/ti';
import apiList from '../../libs/apiLists';

const LibraryRequest = () => {

    const context = useContext(authContext);
    const { islogedin, studentDetails, getStudent, invalidUser } = context;

    const { state } = useLocation();
    const navigate = useNavigate(null);
    const [open, setOpen] = useState(false);
    const [openNavigate, setOpenNavigate] = useState(false);
    const [openSeatReservation, setOpenSeatReservation] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLibDetails(state);
        if (!studentDetails.name && islogedin) {
            getStudent();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (open || openSeatReservation || openNavigate) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [open, openSeatReservation, openNavigate]);

    // const [isClicked, setIsClicked] = useState(false);
    const [libDetails, setLibDetails] = useState(state);
    // const [spinLoading, setSpinLoading] = useState(false);
    const [idxFloor, setIdxFloor] = useState(0);
    const [idxShift, setIdxShift] = useState(0);
    const [idxSeatSelected, setIdxSeatSelected] = useState(null);
    const [actSeats, setactSeats] = useState(libDetails.floors[0].shifts[0].numberOfSeats);

    const handleFloorSectorChange = (e) => {
        setIdxFloor(e.target.value);
        setIdxShift(0);
        setIdxSeatSelected(null);
        setactSeats(libDetails.floors[Number(e.target.value)].shifts[0].numberOfSeats);
    };

    const handleSeatSectorChange = (e) => {
        setIdxShift(e.target.value);
        setIdxSeatSelected(null);
        setactSeats(libDetails.floors[idxFloor].shifts[Number(e.target.value)].numberOfSeats);
    };

    const handleSeatSelection = (idx) => {
        if (libDetails.floors[idxFloor].shifts[idxShift].numberOfSeats[idx].isBooked) {
            setIdxSeatSelected(null);
            return toast.warn("This seat is not availble");
        }
        setIdxSeatSelected(idx);
        toast(`Seat number ${Number(idx) + 1} in shift ${Number(idxShift) + 1} of floor ${idxFloor} is availble`);
    };

    const reserverSeat = async () => {
        if (!islogedin) {
            setOpenNavigate(true);
            return;
        }
        if (userType() !== "student") {
            invalidUser();
            navigate("/login")
            return;
        }

        if (idxSeatSelected === null) {
            return toast.warn("Please select a seat of library to reserve")
        }

        try {
            const selectedShift = libDetails.floors[idxFloor].shifts[idxShift];
            const selectedSeat = selectedShift.numberOfSeats[idxSeatSelected];

            if (selectedSeat.isBooked) {
                toast.error('This seat is already booked in the selected shift.');
                return;
            }

            if (selectedSeat.gender !== studentDetails.gender) {
                toast.error(`Gender mismatch: Seat is for ${selectedSeat.gender}s only`);
                return;
            }

            const selectedStartTime = parseInt(selectedShift.stTime, 10);
            const selectedEndTime = parseInt(selectedShift.endTime, 10);

            for (let i = 0; i < libDetails.floors[idxFloor].shifts.length; i++) {
                if (i !== Number(idxShift)) {
                    const shift = libDetails.floors[idxFloor].shifts[i];
                    const shiftStartTime = parseInt(shift.stTime, 10);
                    const shiftEndTime = parseInt(shift.endTime, 10);

                    const isOverlap =
                        (selectedStartTime >= shiftStartTime && selectedStartTime < shiftEndTime) ||
                        (selectedEndTime > shiftStartTime && selectedEndTime <= shiftEndTime) ||
                        (shiftStartTime >= selectedStartTime && shiftEndTime <= selectedEndTime);

                    if (isOverlap && shift.numberOfSeats[idxSeatSelected].isBooked) {
                        toast.error(`This seat is booked in another overlapping shift (Shift ${i + 1}).`);
                        return;
                    }
                }
            }

            if (!openSeatReservation) {
                setOpenSeatReservation(true);
                return;
            }

            // Proceed to reserve the seat if no overlaps found
            const response = await fetch(apiList.requestLibrarySeat, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                },
                body: JSON.stringify({
                    libraryId: libDetails._id,
                    studentId: studentDetails._id,
                    gender: studentDetails.gender,
                    idxFloor,
                    idxShift,
                    idxSeatSelected,
                }),
            });

            const json = await response.json();

            if (json.success) {
                toast.success(json.message);
            } else {
                toast.error(json.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setOpenSeatReservation(false);
    };

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12 text-gray-700'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 relative'>
                <div className='my-4 flex flex-col lg:flex-row items-center lg:space-x-10 max-lg:space-y-4 pt-24 xl:mx-20'>
                    <div className='p-2 border mx-auto w-full md:w-3/6 lg:w-2/6 flex flex-col rounded-md bg-gradient-to-tl from-blue-200 to-pink-200'>
                        <h1 className='text-xl font-semibold mx-auto mb-2'>{libDetails.libname}</h1>
                        <p><span className='font-semibold'>Owner Name: </span><span>{libDetails.ownername}</span></p>
                        <p><span className='font-semibold'>Number of Floors: </span><span>{libDetails.floors.length}</span></p>
                        <p><span className='font-semibold'>Contact No: </span><Link to={`tel:+91${libDetails.contactnum}`}>{libDetails.contactnum}</Link>, <Link to={`tel:+91${libDetails.libcontactnum}`}>{libDetails.libcontactnum}</Link></p>
                        <p><span className='font-semibold'>Address: </span><span>{libDetails.localarea} {libDetails.city} {libDetails.state}, {libDetails.pin}</span></p>
                    </div>

                    <div className='flex items-center justify-center w-full lg:w-4/6 h-60 lg:h-72'>
                        <iframe title='addloc' src={libDetails.googlemap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-full'></iframe>
                    </div>
                </div>

                <PreviewModal open={open} setOpen={setOpen}>
                    <div className='my-2'>
                        <LibraryPreview library={libDetails} />
                    </div>
                </PreviewModal>

                <div className='pt-4'>
                    <button
                        type="button"
                        className={`w-56 py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1 mx-auto`}
                        onClick={() => { setOpen(true) }}
                    >
                        <span>Preview Library Details</span>
                        <TbLibrary size={18} />
                    </button>
                </div>

                <div className='w-full'>
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
                                {libDetails.floors.map((_, idx) => (
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
                                {libDetails.floors[idxFloor].shifts.map((data, idx) => (
                                    <option key={idx} value={idx}>
                                        Slot {idx + 1} Price {data.price[0].discountPrice}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='my-4'>
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
                                        <td className="py-2 px-4 border">{getStTime(libDetails.floors[idxFloor].shifts[idxShift])} - {getEndTime(libDetails.floors[idxFloor].shifts[idxShift])}</td>
                                    </tr>
                                    <tr className='bg-gray-100'>
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Boy's Seats</th>
                                        <td className="py-2 px-4 border">
                                            {
                                                libDetails.floors[idxFloor].shifts[idxShift].numberOfSeats.filter(
                                                    (seat) => seat.gender === "boy"
                                                ).length
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Girl's Seats</th>
                                        <td className="py-2 px-4 border">
                                            {
                                                libDetails.floors[idxFloor].shifts[idxShift].numberOfSeats.filter(
                                                    (seat) => seat.gender === "girl"
                                                ).length
                                            }
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 text-gray-700 font-semibold border">Price</th>
                                        <td className="py-2 px-4 border">
                                            <ul className="text-sm">
                                                {libDetails.floors[idxFloor].shifts[idxShift].price.map((priceOption, index) => (
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

                        <LibSeats actSeats={actSeats} hadleSeatGender={handleSeatSelection} />

                        <button type="button" className={`w-56 py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1 mx-auto mt-4`} onClick={reserverSeat}>
                            <span>Reserve Your Seat</span>
                            <BiSolidBookmark size={18} />
                        </button>
                    </div>

                </div>
            </div>
            <PreviewModal open={openNavigate} setOpen={setOpenNavigate}>
                <div className='bg-gray-200 text-lg rounded-md p-2'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-xl md:text-2xl text-center font-bold'>Student please get logged in </h1>

                        <div className=''>
                            <p className='text-start'>To reserve a seat it is neccessary to logged in to your account. Please <Link to={"/login"} className='underline text-blue-600'>login</Link> if you have an account! If not <Link to={"/student/signup"} className='underline text-blue-600'>Signup</Link> to have an account!</p>
                        </div>
                    </div>
                </div>
            </PreviewModal>

            <PreviewModal open={openSeatReservation} setOpen={setOpenSeatReservation}>
                <div className='bg-gray-200 text-lg rounded-md p-2'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-xl md:text-2xl font-bold'>Seat Reservation's Details</h1>

                        <div className=''>
                            <p>You have selected seat number {idxSeatSelected + 1} in shift {idxShift + 1} of floor {idxFloor} with time slot {getStTime(libDetails.floors[idxFloor].shifts[idxShift])} - {getEndTime(libDetails.floors[idxFloor].shifts[idxShift])}. Request for this seat will be send to the library owner and he will soon contact you!</p>
                        </div>

                        <div className='flex items-center justify-around space-x-4 w-full'>
                            <button type="button" className={`w-full p-2 text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-end justify-center space-x-1 mx-auto mt-4`} onClick={() => { setOpenSeatReservation(false) }}>
                                <span>Cancel</span>
                                <TiCancel size={18} />
                            </button>
                            <button type="button" className={`w-full p-2 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1 mx-auto mt-4`} onClick={reserverSeat}>
                                <span>Send Request</span>
                                <BiSolidBookmark size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </PreviewModal>
        </div>
    )
}

export default LibraryRequest;