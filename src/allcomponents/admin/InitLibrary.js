import React, { useEffect, useState } from 'react';
import InputBox from '../notificationmessage/InputBox';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const InitLibrary = () => {

    const { state } = useLocation();

    const [libDetails, setLibDetails] = useState(state);
    const [spinLoading, setSpinLoading] = useState(false);

    useEffect(()=>{
        console.log(state.shifts)
        console.log(typeof(libDetails.shifts))
    }, []);

    const handleOnChange = (key, value) => {
        setLibDetails((prevData) => ({ ...prevData, [key]: value }));
        // setLibDetails({
        //     ...libDetails,
        //     [key]: value
        // })
    }

    const handleAddShift = () => {
        const newShift = {
            shiftTime: '7:00 PM to 11:00 AM',
            bookingPrice: 500,
            numberOfSeats: []
        };
        setLibDetails((prevData) => ({
            ...prevData,
            shifts: [...prevData.shifts, newShift]
        }));
    };

    const handleInitLibrary = () => {
        setSpinLoading(true);
        toast("Clicked on handle init library");
        // setSpinLoading(false);
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12 text-gray-700'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28 text-center font-bold text-2xl md:text-4xl'>Name of the library owner</div>

                <div className={`my-10`}>
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
                                    libDetails.googlemap ? <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14791.430570874723!2d83.55957323380159!3d25.571753342118296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991ff08605d2193%3A0x71b090d70df7402!2sMount%20Litera%20Zee%20School!5e0!3m2!1sen!2sin!4v1727185211467!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-96'></iframe> : <div className='border w-full flex items-center justify-center bg-gray-300 font-semibold h-32'>There is no any google map link</div>
                                }
                            </div>

                            <div className='text-center py-4'>
                                <button
                                    type="submit"
                                    className={`group mx-auto w-32 py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2`}
                                    onClick={handleAddShift}
                                >
                                    <span>Add Shift</span>
                                </button>

                                <div>
                                    This is for checking the things
                                    {/* <div>
                                        {
                                            typeof(libDetails.shifts)
                                        }
                                    </div> */}
                                </div>

                                {
                                    Object.keys(libDetails.shifts).map((data, idx) => {
                                        return <div className='pt-4'>
                                            <div className={`border rounded-md ${idx % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} p-1`}>
                                                <div className='text-center font-semibold'>Slot No. {data}</div>
                                                <div key={idx} className='flex items-center justify-center space-x-1'>

                                                    <InputBox name="Start time" id="shifts" type="text" value={libDetails.time} placeholder="Slot starting time" handleOnChange={handleOnChange} />

                                                    <InputBox name="Finish time" id="pin" type="text" value={libDetails.pin} placeholder="Slot ending time" handleOnChange={handleOnChange} />

                                                    <InputBox name="Max Students" id="pin" type="text" value={libDetails.pin} placeholder="Max number of students" handleOnChange={handleOnChange} />
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group mx-auto w-full lg:w-4/6 flex justify-center items-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2`}
                                onClick={handleInitLibrary}
                            >
                                <span>Initiate As New Library</span>
                                {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                            </button>
                        </div>
                    </form>
                </div>

                <div className='flex items-center justify-center'>

                </div>

            </div>
        </div>
    )
}

export default InitLibrary;


// src/components/UpdateLibrary.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdateLibrary = ({ libraryId }) => {
//     const [libraryData, setLibraryData] = useState({
//         name: '',
//         address: '',
//         contactNumber: '',
//         shifts: []
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchLibraryData = async () => {
//             try {
//                 const response = await axios.get(`/api/libraries/${libraryId}`);
//                 setLibraryData(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch library data');
//                 setLoading(false);
//             }
//         };
//         fetchLibraryData();
//     }, [libraryId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLibraryData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleShiftChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedShifts = [...libraryData.shifts];
//         updatedShifts[index] = { ...updatedShifts[index], [name]: value };
//         setLibraryData((prevData) => ({ ...prevData, shifts: updatedShifts }));
//     };

//     const handleAddShift = () => {
//         const newShift = {
//             shiftTime: '',
//             bookingPrice: 0,
//             numberOfSeats: [] // Initializing with an empty array for seats
//         };
//         setLibraryData((prevData) => ({
//             ...prevData,
//             shifts: [...prevData.shifts, newShift]
//         }));
//     };

//     const handleDeleteShift = (index) => {
//         const updatedShifts = libraryData.shifts.filter((_, i) => i !== index);
//         setLibraryData((prevData) => ({ ...prevData, shifts: updatedShifts }));
//     };

//     const handleSeatChange = (shiftIndex, seatIndex, e) => {
//         const { name, value } = e.target;
//         const updatedShifts = [...libraryData.shifts];
//         const updatedSeats = updatedShifts[shiftIndex].numberOfSeats;

//         // Ensure the seat exists and update the gender
//         if (!updatedSeats[seatIndex]) {
//             updatedSeats[seatIndex] = { gender: '' }; // Create new seat if it doesn't exist
//         }

//         updatedSeats[seatIndex][name] = value; // Update the gender field
//         setLibraryData((prevData) => ({ ...prevData, shifts: updatedShifts }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`/api/libraries/${libraryId}`, libraryData);
//             alert('Library details updated successfully!');
//         } catch (err) {
//             setError('Failed to update library details');
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Update Library Details</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Library Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={libraryData.name}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Address</label>
//                     <input
//                         type="text"
//                         name="address"
//                         value={libraryData.address}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Contact Number</label>
//                     <input
//                         type="text"
//                         name="contactNumber"
//                         value={libraryData.contactNumber}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <h2 className="text-lg font-semibold mt-4">Shifts</h2>
//                     {libraryData.shifts.map((shift, shiftIndex) => (
//                         <div key={shiftIndex} className="border p-4 rounded-lg mt-2">
//                             <label className="block text-sm font-medium text-gray-700">Shift Time</label>
//                             <input
//                                 type="text"
//                                 name="shiftTime"
//                                 value={shift.shiftTime}
//                                 onChange={(e) => handleShiftChange(shiftIndex, e)}
//                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                                 required
//                             />
//                             <label className="block text-sm font-medium text-gray-700 mt-2">Booking Price</label>
//                             <input
//                                 type="number"
//                                 name="bookingPrice"
//                                 value={shift.bookingPrice}
//                                 onChange={(e) => handleShiftChange(shiftIndex, e)}
//                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                                 required
//                             />

//                             {/* Seats section */}
//                             <h3 className="text-md font-semibold mt-4">Seats</h3>
//                             {shift.numberOfSeats.map((seat, seatIndex) => (
//                                 <div key={seatIndex} className="flex space-x-2 mt-2">
//                                     <input
//                                         type="text"
//                                         name="gender"
//                                         placeholder="Gender (boy/girl)"
//                                         value={seat.gender || ''}
//                                         onChange={(e) => handleSeatChange(shiftIndex, seatIndex, e)}
//                                         className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             ))}
//                             <button
//                                 type="button"
//                                 onClick={() => {
//                                     const updatedShifts = [...libraryData.shifts];
//                                     updatedShifts[shiftIndex].numberOfSeats.push({ gender: '' }); // Add new seat
//                                     setLibraryData((prevData) => ({ ...prevData, shifts: updatedShifts }));
//                                 }}
//                                 className="bg-green-500 text-white py-1 px-2 rounded mt-2"
//                             >
//                                 Add Seat
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => handleDeleteShift(shiftIndex)}
//                                 className="bg-red-500 text-white py-1 px-2 rounded mt-2"
//                             >
//                                 Delete Shift
//                             </button>
//                         </div>
//                     ))}
//                     <button
//                         type="button"
//                         onClick={handleAddShift}
//                         className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
//                     >
//                         Add New Shift
//                     </button>
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                     Update Library
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdateLibrary;