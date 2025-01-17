import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import apiList from '../../libs/apiLists';
import LibSeats from './LibSeats';
import { PriceOptionInputBox } from '../notificationmessage/InputBox';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';
import { TbLibrary } from 'react-icons/tb';
import { PreviewModal } from '../notificationmessage/Modal';
import LibraryPreview from '../notificationmessage/LibraryPreview';
import { BiLibrary } from 'react-icons/bi';
import { FaDeleteLeft } from 'react-icons/fa6';

const EditLibrary = () => {

    const { state } = useLocation();
    const navigate = useNavigate(null);

    const context = useContext(authContext);
    const { invalidUser, setLibraryDetails } = context;
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
        window.scrollTo(0, 0);
        if (userType() !== "libowner" || !state.ownername) {
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
    const priceOpt = ["1 Month", "2 Months", "3 Months", "6 Months", "1 Years"];

    const handleFloorSectorChange = (e) => {
        setIdxFloor(e.target.value);
        setIdxShift(0);
        setactSeats(libDetails.floors[Number(e.target.value)].shifts[0].numberOfSeats);
    };

    const handleShiftSectorChange = (e) => {
        setIdxShift(e.target.value);
        setactSeats(libDetails.floors[idxFloor].shifts[Number(e.target.value)].numberOfSeats);
    };

    const handleShiftPriceChange = (id, value, idx) => {
        const updatedFloors = [...libDetails.floors];
        updatedFloors[idxFloor].shifts[idxShift].price[idx] = {
            ...updatedFloors[idxFloor].shifts[idxShift].price[idx],
            [id]: value,
        };
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

    const handleEditLibrary = async () => {
        if (!isClicked) {
            setIsClicked(true);
            try {
                setSpinLoading(true);
                const response = await fetch(apiList.updatelibandprofile, {
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
                    setLibraryDetails(libDetails);
                    navigate("/libowner");
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
                <div className='pt-28 text-center font-bold text-2xl md:text-4xl'>{libDetails.libname}</div>

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
                            onChange={(e) => handleShiftSectorChange(e)}
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

                <div className={`my-4`}>

                    <div className='mb-4 w-full md:w-60 mx-auto'>
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

                    <form className="mx-auto max-w-screen-md space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className={`space-y-1`}>
                            <div className='border border-gray-400 rounded-md bg-gray-200 p-1 relative'>
                                <div className='font-semibold text-center'>Shift No. {Number(idxShift) + 1} of Floor {Number(idxFloor)}</div>
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

                            <div className='text-center text-xl font-semibold pt-4'>Mark sheets for the girls</div>

                            <div className='text-center my-2'>
                                <div><span className='border bg-blue-500 w-5 px-4 rounded-md text-white'>B</span> is for the boys and <span className='border bg-pink-500 w-5 px-4 rounded-md text-white'>G</span> is for girls</div>
                                <div>Click on seats to toggle the gender</div>
                            </div>
                            <LibSeats actSeats={actSeats} hadleSeatGender={hadleSeatGender} />

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
                                onClick={handleEditLibrary}
                            >
                                <span>Update Library</span>
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

export default EditLibrary;