import React, { useContext, useEffect, useState } from 'react';
// import notifimg from '../images/notifimg.svg';
import { PreviewModal } from '../notificationmessage/Modal';
import RenewSubscription from './RenewSubscription';
import authContext from '../../context/auth/authContext';
import { userType } from '../../libs/AllRoutes';
import { Link, useNavigate } from 'react-router-dom';

const NotificationByOwner = () => {

    const context = useContext(authContext);
    const { libraryDetails, getLibOwner, invalidUser } = context;

    const navigate = useNavigate(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userType() !== "libowner") {
            invalidUser()
            navigate("/login")
            return;
        }
        if (!libraryDetails.ownername) {
            getLibOwner();
        }

        document.title = "All Students - ML";

        // eslint-disable-next-line
    }, []);

    const [openSubsExpired, setOpenSubsExpired] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (libraryDetails?.floors?.length > 0) {
            // Extract student details from nested structure
            let studentsList = [];
            libraryDetails.floors.forEach((floor, floorIdx) => {
                floor.shifts.forEach((shift, shiftIdx) => {
                    shift.numberOfSeats.forEach((seat, seatIdx) => {
                        if (seat.isBooked) {
                            console.log(seat)
                            seat.student.subscriptionDetails.forEach(data => {
                                if (data.idxFloor === floorIdx && data.idxShift === shiftIdx && data.idxSeatSelected === seatIdx) {
                                    studentsList.push({
                                        name: seat.student.name,
                                        expiryDate: data.expiryDate,
                                        subscriptionDate: data.subscriptionDate,
                                        contact: seat.student.contactnum,
                                    });
                                }
                            })
                        }
                    });
                });
            });
            setStudents(studentsList);
        }

        // eslint-disable-next-line
    }, [libraryDetails?.ownername]);

    useEffect(() => {
        if (libraryDetails.ownername && libraryDetails.subscriptionDetails) {
            const currDate = new Date();
            const expDate = new Date(libraryDetails.subscriptionDetails.expiryDate);
            if (currDate > expDate) {
                setOpenSubsExpired(true);
            }
        }
    }, [libraryDetails?.ownername, libraryDetails?.subscriptionDetails])

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12 text-gray-700'>
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8 select-none">
                <div className="pt-28 mb-4">
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 text-center">Library Students</h1>
                </div>

                {students.length > 0 ? (
                    <div className="overflow-x-auto max-w-screen-lg mx-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="border min-w-16 text-start py-1 px-1">S. No.</th>
                                    <th className="border min-w-32 text-start py-1 px-1">Name</th>
                                    <th className="border min-w-32 text-start py-1 px-1">Expiry Date</th>
                                    <th className="border min-w-32 text-start py-1 px-1">Subs Date</th>
                                    <th className="border min-w-32 text-start py-1 px-1">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((data, index) => (
                                    <tr key={index} className="border">
                                        <td className="border min-w-16 text-start py-1 px-1">{Number(index) + 1}</td>
                                        <td className="border min-w-32 text-start py-1 px-1">{data.name}</td>
                                        <td className="border min-w-32 text-start py-1 px-1">{new Date(data.expiryDate).getDate()}/{new Date(data.expiryDate).getMonth() + 1}/{new Date(data.expiryDate).getFullYear()}</td>
                                        <td className="border min-w-32 text-start py-1 px-1">{new Date(data.subscriptionDate).getDate()}/{new Date(data.subscriptionDate).getMonth() + 1}/{new Date(data.subscriptionDate).getFullYear()}</td>
                                        <td className="border min-w-32 text-start py-1 px-1"><Link to={`tel:+91${data.contact}`}>{data.contact}</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='text-xl text-center'>All the seats of your library is empty, no students are there!</p>
                )}
            </div>

            <PreviewModal open={openSubsExpired} setOpen={() => { setOpenSubsExpired(true) }}>
                <RenewSubscription setOpenSubsExpired={setOpenSubsExpired} />
            </PreviewModal>

        </div>
    )
}

export default NotificationByOwner;