import React, { useContext, useEffect, useState } from 'react';
import InputBox, { PriceOptionInputBox, SelectBox } from '../notificationmessage/InputBox';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import LibSeats from '../library/LibSeats';
import apiList from '../../libs/apiLists';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';
import { MdDeleteForever } from 'react-icons/md';
import { BiLayerPlus, BiLibrary, BiListPlus } from 'react-icons/bi';
import { FaDeleteLeft } from 'react-icons/fa6';
import { PreviewModal } from '../notificationmessage/Modal';
import LibraryPreview from '../notificationmessage/LibraryPreview';
import { TbLibrary } from 'react-icons/tb';
import { initLibraryValidation } from '../../libs/Validation';

const InitLibrary = () => {

    const { state } = useLocation();
    const navigate = useNavigate(null);

    const context = useContext(authContext);
    const { invalidUser } = context;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (open) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [open]);

    useEffect(() => {
        if (userType() !== "admin" || !state.ownername) {
            invalidUser()
            navigate("/login")
            return;
        }
        // eslint-disable-next-line
    }, [])

    const [isClicked, setIsClicked] = useState(false);
    const [libDetails, setLibDetails] = useState(state);
    const [spinLoading, setSpinLoading] = useState(false);
    const [idxFloor, setIdxFloor] = useState(0);
    const [idxShift, setIdxShift] = useState(0);
    const [actSeats, setactSeats] = useState(libDetails.floors[0].shifts[0].numberOfSeats);
    const priceOpt = ["30 Days", "60 Days", "90 Days", "180 Days", "365 Days"];

    const handleOnChange = (key, value) => {
        setLibDetails((prevData) => ({ ...prevData, [key]: value }));
    }

    const handleAddFloor = () => {
        const newFloor = {
            shifts: [
                {
                    stTime: 7,
                    endTime: 12,
                    description: '',
                    price: [
                        {
                            actualPrice: 700,
                            discountPrice: 500,
                            duration: '30 Days'
                        }
                    ],
                    numberOfSeats: Array(40).fill({
                        student: null,
                        gender: 'boy',
                        isBooked: false
                    })
                },
                {
                    stTime: 12,
                    endTime: 17,
                    description: '',
                    price: [
                        {
                            actualPrice: 700,
                            discountPrice: 500,
                            duration: '30 Days'
                        }
                    ],
                    numberOfSeats: Array(40).fill({
                        student: null,
                        gender: 'boy',
                        isBooked: false
                    })
                },
                {
                    stTime: 17,
                    endTime: 21,
                    description: '',
                    price: [
                        {
                            actualPrice: 700,
                            discountPrice: 500,
                            duration: '30 Days'
                        }
                    ],
                    numberOfSeats: Array(40).fill({
                        student: null,
                        gender: 'boy',
                        isBooked: false
                    })
                }
            ]
        };

        const updatedFloors = [...libDetails.floors, newFloor];

        setLibDetails((prevData) => ({
            ...prevData,
            floors: updatedFloors
        }));
        toast.success(`New floor ${updatedFloors.length - 1} added successfully!`);
    };

    const handleAddShift = () => {
        const newShift = {
            stTime: 0,
            endTime: 12,
            description: '',
            price: [
                {
                    actualPrice: 700,
                    discountPrice: 500,
                    duration: '30 Days'
                }
            ],
            numberOfSeats: Array(40).fill({
                student: null,
                gender: 'boy',
                isBooked: false
            })
        };

        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts = [...updatedFloors[idxFloor].shifts, newShift];

        setLibDetails((prevData) => ({
            ...prevData,
            floors: updatedFloors
        }));
        toast.success(`New Shift ${updatedFloors[idxFloor].shifts.length} in Floor ${idxFloor} added!`);
    };

    const handleAddPriceOption = (e) => {
        const selectedIndex = Number(e.target.value);
        const selectedDuration = priceOpt[selectedIndex];

        if (!selectedDuration) {
            toast.warn("Invalid option selected");
            e.target.value = "";
            return;
        }

        const updatedFloors = [...libDetails.floors];
        const currentShift = updatedFloors[idxFloor]?.shifts[idxShift];

        if (!currentShift || !currentShift.price) {
            toast.error("Invalid floor or shift selection");
            e.target.value = "";
            return;
        }

        const isDuplicate = currentShift.price.some(
            (priceOption) => priceOption.duration === selectedDuration
        );

        if (isDuplicate) {
            toast.warn("Option already exists");
            e.target.value = "";
            return;
        }

        const newPriceOption = {
            actualPrice: 700,
            discountPrice: 500,
            duration: selectedDuration
        };

        currentShift.price = [...currentShift.price, newPriceOption];

        setLibDetails((prevData) => ({
            ...prevData,
            floors: updatedFloors
        }));
        toast.success("Price option added successfully");
        e.target.value = "";
    };


    const handleDeleteFloor = () => {
        if (libDetails.floors.length <= 1) {
            return toast.warn("There should be at least one floor");
        }
        const updatedFloors = libDetails.floors.filter((_, i) => i !== Number(idxFloor));
        toast.warn(`Floor ${idxFloor} has been removed!`);
        setIdxFloor(0);
        setIdxShift(0);
        setactSeats(updatedFloors[0].shifts[0].numberOfSeats);
        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
    };

    const handleDeleteShift = () => {
        if (libDetails.floors[idxFloor].shifts.length <= 3) {
            return toast.warn("There should be at least three shifts");
        }
        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts = updatedFloors[idxFloor].shifts.filter((_, i) => i !== Number(idxShift));
        toast.warn(`Shift ${Number(idxShift) + 1} of Floor ${idxFloor} is removed!`);
        setIdxShift(0);
        setactSeats(updatedFloors[idxFloor].shifts[0].numberOfSeats);
        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
    };

    const handleDeletePriceOpt = (idx) => {
        if (libDetails.floors[idxFloor].shifts[idxShift].price.length <= 1) {
            return toast.warn("There should be at least one price option");
        }
        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts[idxShift].price = updatedFloors[idxFloor].shifts[idxShift].price.filter((_, i) => i !== Number(idx));
        setactSeats(updatedFloors[idxFloor].shifts[idxShift].numberOfSeats);
        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
    };

    const handleFloorSectorChange = (e) => {
        setIdxFloor(e.target.value);
        setIdxShift(0);
        setactSeats(libDetails.floors[Number(e.target.value)].shifts[0].numberOfSeats);
    };

    const handleShiftSectorChange = (e) => {
        setIdxShift(e.target.value);
        setactSeats(libDetails.floors[idxFloor].shifts[Number(e.target.value)].numberOfSeats);
    };

    const handleShiftChange = (e) => {
        const { name, value } = e.target;
        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts[idxShift] = {
            ...updatedFloors[idxFloor].shifts[idxShift],
            [name]: value,
        };
        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
    };

    const handleShiftPriceChange = (id, value, idx) => {
        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts[idxShift].price[idx] = {
            ...updatedFloors[idxFloor].shifts[idxShift].price[idx],
            [id]: value,
        };
        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
    };

    const handleShiftSeatChange = (_, value) => {
        if (Number(value) > 100) {
            return toast.error("Number of seats cannot be more than 100");
        }
        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts[idxShift].numberOfSeats = Array(Number(value)).fill({
            student: null,
            gender: "boy",
            isBooked: false,
        });
        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
        setactSeats(updatedFloors[idxFloor].shifts[idxShift].numberOfSeats);
    };

    const hadleSeatGender = (index) => {
        const updatedFloors = [...libDetails.floors];
        const updatedSeats = [...updatedFloors[idxFloor].shifts[idxShift].numberOfSeats];

        if (!updatedSeats[index]) {
            toast("Seat is not present!");
            return;
        }

        updatedSeats[index] = {
            ...updatedSeats[index],
            gender: updatedSeats[index].gender === "boy" ? "girl" : "boy",
        };

        updatedFloors[idxFloor].shifts[idxShift].numberOfSeats = updatedSeats;

        setLibDetails((prevData) => ({ ...prevData, floors: updatedFloors }));
        setactSeats(updatedSeats);
    };

    const handleInitLibrary = async () => {

        if (!initLibraryValidation(libDetails)) { return }

        if (!isClicked) {
            setIsClicked(true);
            try {
                setSpinLoading(true);
                const response = await fetch(apiList.adminupdatelibrary + `/${libDetails._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': localStorage.getItem("authtoken")
                    },
                    body: JSON.stringify(libDetails)
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(json.message);
                    navigate("/request");
                    setSpinLoading(false);
                }
                else {
                    toast.error(json.message);
                    setIsClicked(false);
                    setSpinLoading(false);
                }
            }
            catch (err) {
                toast.error(err.message);
                setIsClicked(false);
                setSpinLoading(false);
            }

        }
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12 text-gray-700'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28 text-center font-bold text-2xl md:text-4xl'>Fill details carefully</div>

                <div className={`my-6`}>
                    <form className="mx-auto max-w-screen-md space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className={`space-y-1`}>

                            <div className='flex max-md:flex-col md:space-x-2'>
                                <InputBox name="Name" id="ownername" type="text" value={libDetails.ownername} placeholder="Enter library owner name" handleOnChange={handleOnChange} />

                                <InputBox name="Library Name" id="libname" type="text" value={libDetails.libname} placeholder="Enter name of the library" handleOnChange={handleOnChange} />
                            </div>

                            <div className='flex space-x-2'>
                                <InputBox name="Contact No" id="contactnum" type="text" value={libDetails.contactnum} placeholder="Contact number" handleOnChange={handleOnChange} />

                                <InputBox name="Library Contact No" id="libcontactnum" type="text" value={libDetails.libcontactnum} placeholder="Library contact number" handleOnChange={handleOnChange} />
                            </div>

                            <div className='flex max-md:flex-col md:space-x-2'>
                                <InputBox name="Local Area" id="localarea" type="text" value={libDetails.localarea} placeholder="Mention your local area" handleOnChange={handleOnChange} />

                                <InputBox name="City" id="city" type="text" value={libDetails.city} placeholder="Enter your city" handleOnChange={handleOnChange} />
                            </div>

                            <div className='flex items-center justify-center space-x-2'>
                                <InputBox name="State" id="state" type="text" value={libDetails.state} placeholder="Enter you state" handleOnChange={handleOnChange} />

                                <InputBox name="PIN" id="pin" type="text" value={libDetails.pin} placeholder="PIN Code of your area" handleOnChange={handleOnChange} />
                            </div>

                            <div className='flex items-center justify-center space-x-2'>
                                <InputBox name="Aadhar No." id="aadharnum" type="text" value={libDetails.aadharnum} placeholder="Enter your aadhar number" handleOnChange={handleOnChange} />

                                <InputBox name="PIN" id="pin" type="text" value={libDetails.pin} placeholder="PIN Code of your area" handleOnChange={handleOnChange} />
                            </div>

                            <div className='flex flex-col items-center space-y-4'>
                                <InputBox name="Embaded Google Map Link" id="googlemap" type="text" value={libDetails.googlemap} placeholder="Enter embaded google map link" handleOnChange={handleOnChange} />

                                {
                                    libDetails.googlemap ? <iframe title='map' src={libDetails.googlemap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-96'></iframe> : <div className='border w-full flex items-center justify-center bg-gray-300 font-semibold h-32'>There is no any google map link</div>
                                }
                            </div>

                            <div className='py-4'>
                                <div className='flex max-md:flex-col max-md:space-y-2 items-end justify-center md:space-x-2 my-2'>
                                    <div className='max-md:w-full w-3/5'>
                                        <label htmlFor="shifts" className="px-1 text-sm">Select Floor</label>
                                        <select name="shifts" id="shifts" className='rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                            onChange={(e) => { handleFloorSectorChange(e) }}
                                            value={idxFloor}
                                        >
                                            {
                                                libDetails.floors.map((_, idx) => {
                                                    return <option key={idx} value={idx}>Floor {idx}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='flex items-center justify-center space-x-2 max-md:w-full w-2/5'>
                                        <button
                                            type="button"
                                            className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1`}
                                            onClick={handleAddFloor}
                                        >
                                            <span>Add Floor</span>
                                            <BiLayerPlus size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center space-x-1`}
                                            onClick={handleDeleteFloor}
                                        >
                                            <span>Remove Floor</span>
                                            <MdDeleteForever size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex max-md:flex-col max-md:space-y-2 items-end justify-center md:space-x-2 my-2'>
                                    <div className='max-md:w-full w-3/5'>
                                        <label htmlFor="shifts" className="px-1 text-sm">Select Shift</label>
                                        <select name="shifts" id="shifts" className='rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                            onChange={(e) => { handleShiftSectorChange(e) }}
                                            value={idxShift}
                                        >
                                            {
                                                libDetails.floors[idxFloor].shifts.map((data, idx) => {
                                                    return <option key={idx} value={idx}>Slot {idx + 1} Price: {data.price[0].discountPrice} for {data.price[0].duration}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='flex items-center justify-center space-x-2 max-md:w-full w-2/5'>
                                        <button
                                            type="button"
                                            className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1`}
                                            onClick={handleAddShift}
                                        >
                                            <span>Add Shift</span>
                                            <BiListPlus size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center space-x-1`}
                                            onClick={handleDeleteShift}
                                        >
                                            <span>Remove Shift</span>
                                            <MdDeleteForever size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='pt-4'>
                                    <div className={`border border-gray-400 rounded-md bg-gray-200 p-1 relative`}>
                                        <div className='font-semibold text-center'>Shift No. {Number(idxShift) + 1} of Floor {Number(idxFloor)}</div>
                                        <div className='flex flex-col max-md:space-y-1.5 items-center justify-center'>
                                            <div className='flex items-center justify-center space-x-1.5 w-full'>
                                                <SelectBox name="Start time" id="stTime" value={libDetails.floors[idxFloor].shifts[idxShift].stTime} handleOnChange={handleShiftChange} />

                                                <SelectBox name="End time" id="endTime" value={libDetails.floors[idxFloor].shifts[idxShift].endTime} handleOnChange={handleShiftChange} />
                                            </div>

                                            <div className='w-full'>
                                                <label htmlFor="description" className="px-1 text-sm">
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    autoComplete="description"
                                                    className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                                    placeholder="Enter descriptioin for this shift if any!"
                                                    value={libDetails.floors[idxFloor].shifts[idxShift].description}
                                                    onChange={(e) => {handleShiftChange(e) }}
                                                />
                                            </div>

                                            <div className='flex items-center justify-center space-x-1.5 w-full'>
                                                <InputBox name="Max Student" id="pin" type="text" value={libDetails.floors[idxFloor].shifts[idxShift].numberOfSeats.length} placeholder="Enter the price for the shift" handleOnChange={handleShiftSeatChange} />

                                                <div className='w-full'>
                                                    <label htmlFor="priceopt" className="px-1 text-sm">Add Price Options</label>
                                                    <select name="priceopt" id="priceopt" className='rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                                        onChange={(e) => { handleAddPriceOption(e) }}
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>Select a price option</option>
                                                        {
                                                            priceOpt.map((_, idx) => {
                                                                return <option key={idx} value={idx}>{priceOpt[idx]}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='flex flex-col items-center justify-center w-full'>
                                                {
                                                    libDetails.floors[idxFloor].shifts[idxShift].price.map((price, idx) => {
                                                        return <div key={idx} className='flex flex-col items-center justify-center w-full border border-gray-400 rounded-md my-2 p-1 relative bg-gray-300'>
                                                            <div className='w-full text-center font-semibold'>{price.duration}</div>
                                                            <FaDeleteLeft onClick={() => { handleDeletePriceOpt(idx) }} className='absolute top-0 right-0 m-2 cursor-pointer' />
                                                            <div className='flex items-center justify-center space-x-1.5 w-full'>
                                                                <PriceOptionInputBox name="Price" id="actualPrice" type="text" value={price.actualPrice} idx={idx} placeholder="Price for the shift" handleOnChange={handleShiftPriceChange} />

                                                                <PriceOptionInputBox name="D. Price" id="discountPrice" type="text" value={price.discountPrice} idx={idx} placeholder="Price after discount" handleOnChange={handleShiftPriceChange} />
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='text-center text-xl font-semibold'>Mark sheets for the girls</div>

                                <div className='w-full'>
                                    <div className='my-4'>
                                        <div className='text-center my-2'>
                                            <div><span className='border bg-blue-500 w-5 px-4 rounded-md text-white'>B</span> is for the boys and <span className='border bg-pink-500 w-5 px-4 rounded-md text-white'>G</span> is for girls</div>
                                            <div>Click on seats to toggle the gender</div>
                                        </div>
                                        <LibSeats actSeats={actSeats} hadleSeatGender={hadleSeatGender} />
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className='flex max-md:flex-col max-md:space-y-4 items-center justify-center md:space-x-4'>
                            <button
                                type="button"
                                className={`w-full py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1`}
                                onClick={() => { setOpen(true) }}
                            >
                                <span>Preview Library Details</span>
                                <TbLibrary size={18} />
                            </button>
                            <button
                                type="submit"
                                className={`w-full py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1`}
                                onClick={handleInitLibrary}
                            >
                                <span>Initiate As New Library</span>
                                {spinLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <BiLibrary size={18} />}
                            </button>
                        </div>
                    </form>
                </div>

                <PreviewModal open={open} setOpen={setOpen}>
                    <div className='my-4'>
                        <LibraryPreview library={libDetails} />
                    </div>
                </PreviewModal>

            </div>
        </div>
    )
}

export default InitLibrary;