import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import apiList from '../../libs/apiLists';
import LibSeats from './LibSeats';
import { ShiftInputBox } from '../notificationmessage/InputBox';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';

const EditLibrary = () => {

    const { state } = useLocation();
    const navigate = useNavigate(null);

    const context = useContext(authContext);
    const { invalidUser, setLibraryDetails } = context;

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
    const [idxSeatSelector, setIdxSeatSelector] = useState(0);
    const [actSeats, setactSeats] = useState(libDetails.shifts[0].numberOfSeats);

    const handleSeatSectorChange = (e) => {
        setIdxSeatSelector(e.target.value);
        setactSeats(libDetails.shifts[e.target.value].numberOfSeats);
    };

    const handleShiftChange = (index, e) => {
        const { name, value } = e.target;
        const updatedShifts = [...libDetails.shifts];
        updatedShifts[index] = { ...updatedShifts[index], [name]: value };
        setLibDetails((prevData) => ({ ...prevData, shifts: updatedShifts }));
    };

    const hadleSeatGender = (index) => {
        const updatedShifts = [...libDetails.shifts];
        const updatedSeats = [...updatedShifts[idxSeatSelector].numberOfSeats];

        const updatedSeat = { ...updatedSeats[index] };
        updatedSeat.gender = updatedSeat.gender === "boy" ? "girl" : "boy";
        updatedSeats[index] = updatedSeat;
        updatedShifts[idxSeatSelector] = { ...updatedShifts[idxSeatSelector], numberOfSeats: updatedSeats };

        setLibDetails((prevData) => ({ ...prevData, shifts: updatedShifts }));
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
                    console.log(json.message);
                }
            }
            catch (err) {
                toast.error(err.message);
                setIsClicked(false);
                setSpinLoading(false);
                console.log(err.message);
            }

        }
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12 text-gray-700'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28 text-center font-bold text-2xl md:text-4xl'>{libDetails.libname}</div>

                <div className={`my-4`}>
                    <form className="mx-auto max-w-screen-sm space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className={`space-y-1`}>
                            {
                                libDetails.shifts.map((data, idx) => {
                                    return <div key={idx} className='pt-4'>
                                        <div className={`border rounded-md ${idx % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} p-1 relative`}>
                                            <div className='font-semibold text-center'>Slot No. {idx + 1}</div>
                                            <div className='flex flex-col md:flex-row max-md:space-y-1.5 md:space-x-1.5 items-center justify-center'>
                                                <div className='flex items-center justify-center space-x-1.5 w-full'>
                                                    <ShiftInputBox idx={idx} name="Price" id="price" type="text" value={data.price} placeholder="Price for the shift" handleOnChange={handleShiftChange} />

                                                    <ShiftInputBox idx={idx} name="Discounted Price" id="discountPrice" type="text" value={data.discountPrice} placeholder="Price after discount" handleOnChange={handleShiftChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                            <div>
                                <div className='text-center text-xl font-semibold'>Mark sheets for the girls</div>

                                <div className='w-full'>
                                    <label htmlFor="shifts" className="px-1 text-sm">Select shift</label>
                                    <select name="shifts" id="shifts" className='rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                        onChange={(e) => { handleSeatSectorChange(e) }}
                                        value={idxSeatSelector}
                                    >
                                        {
                                            libDetails.shifts.map((data, idx) => {
                                                return <option key={idx} value={idx}>Slot {idx + 1} Price {data.discountPrice}</option>
                                            })
                                        }
                                    </select>

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

                        <div>
                            <button
                                type="submit"
                                className={`group mx-auto w-full lg:w-4/6 flex justify-center items-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2`}
                                onClick={handleEditLibrary}
                            >
                                <span>Update Library</span>
                                {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditLibrary;