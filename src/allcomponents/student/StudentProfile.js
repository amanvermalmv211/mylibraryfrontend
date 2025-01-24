import React, { useContext, useEffect, useState } from 'react';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FormModal } from '../notificationmessage/Modal';
import InputBox from '../notificationmessage/InputBox';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';
import { stdProfileValidation } from '../../libs/Validation';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';
import RequestView from './RequestView';
import LibraryDetails from './LibraryDetails';

const StudentProfile = () => {

    const context = useContext(authContext);
    const { invalidUser, loading, studentDetails, setStudentDetails, getStudent } = context;

    useEffect(() => {
        if (userType() !== "student") {
            invalidUser()
            navigate("/login")
            return;
        }
        if (!studentDetails.name) {
            getStudent();
        }
        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate(null);

    const [open, setOpen] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (open) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
            setSpinLoading(false);
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [open]);

    const [stdProfile, setStdProfileDet] = useState(studentDetails);

    const handleOnChange = (key, value) => {
        setStdProfileDet({
            ...stdProfile,
            [key]: value
        })
    };

    const handleUpdateProfile = async () => {
        if (!stdProfileValidation(stdProfile)) { return }
        try {
            setSpinLoading(true);
            const response = await fetch(apiList.updateStdProfile, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                },
                body: JSON.stringify({ profileImg: stdProfile.profileImg, name: stdProfile.name, contactnum: stdProfile.contactnum, city: stdProfile.city, pin: stdProfile.pin, gender: stdProfile.gender })
            });

            const json = await response.json();
            if (json.success) {
                setStudentDetails(json.data);
                toast.success(json.message)
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`StdProfile : ${err.message}`);
        }
        setOpen(false);
        setSpinLoading(false);
    };

    const profilePic = ["https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
        "https://static.vecteezy.com/system/resources/previews/027/224/407/original/girl-hugs-stack-of-books-standing-in-library-or-bookstore-and-rejoicing-at-opportunity-to-read-lot-png.png",
        "https://www.pngkey.com/png/detail/204-2049354_ic-account-box-48px-profile-picture-icon-square.png",
        "https://images.pexels.com/photos/1926404/pexels-photo-1926404.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVPTu0F-CIhbqDMFkcatqHGb2UeAVFgPOCw&s",
        "https://img.freepik.com/free-vector/icons-with-empty-square-templates_1308-85393.jpg",
        "https://img.freepik.com/premium-vector/line-art-diamonds-squares-brush-vector-illustration_756957-1433.jpg",
        "https://i.pinimg.com/564x/76/f0/11/76f0117bcced04cba3d2910007070b0d.jpg",
        "https://images.pexels.com/photos/25626523/pexels-photo-25626523.jpeg?cs=srgb&dl=pexels-googledeepmind-25626523.jpg&fm=jpg",
        "https://media.istockphoto.com/id/1216124671/photo/square-tubes.jpg?s=612x612&w=0&k=20&c=rJ2fybTzpiUK9LrPJ1ZRBKDp41Hpb5et1HvmkbJ1BkU=",
        "https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3F1YXJlfGVufDB8fDB8fHww",
        "https://png.pngtree.com/background/20230610/original/pngtree-profile-of-an-image-of-a-man-in-a-square-design-picture-image_3098265.jpg",
        "https://st.depositphotos.com/46542440/55684/i/450/depositphotos_556849354-stock-illustration-square-face-character-stiff-art.jpg"
    ]

    const formTemplate = () => {
        return (
            <form className="space-y-4 pb-1" onSubmit={(e) => e.preventDefault()}>
                <div className={`space-y-2`}>

                    <div className="nobar grid grid-row-1 grid-flow-col gap-3 overflow-x-auto">
                        {
                            profilePic.map((data, idx) => {
                                return <div className={`h-10 md:h-14 w-10 md:w-14 ${stdProfile.profileImg === idx ? "border-2 border-blue-600" : "hover:border-2 hover:border-blue-500"} border rounded-md overflow-hidden cursor-pointer`} onClick={() => { handleOnChange("profileImg", idx) }}>
                                    <img src={data} alt='Profile Pic' className='w-full h-full object-cover' />
                                </div>
                            })
                        }
                    </div>

                    <div className='flex space-x-1.5'>
                        <InputBox name="Name" id="name" type="text" value={stdProfile.name} placeholder="Enter your name" handleOnChange={handleOnChange} />

                        <div className='w-full'>
                            <label htmlFor="gender" className="px-1 text-sm">Gender</label>
                            <select name="gender" id="gender" className='rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                onChange={(e) => { handleOnChange("gender", e.target.value) }}
                                value={stdProfile.gender}
                            >
                                <option value="boy">Male</option>
                                <option value="girl">Female</option>
                            </select>
                        </div>

                    </div>

                    <div className='flex space-x-1.5'>
                        <InputBox name="City" id="city" type="text" value={stdProfile.city} placeholder="Enter your city" handleOnChange={handleOnChange} />

                        <InputBox name="PIN" id="pin" type="text" value={stdProfile.pin} placeholder="Enter your pin" handleOnChange={handleOnChange} />
                    </div>

                    <InputBox name="Contact No." id="contactnum" type="text" value={stdProfile.contactnum} placeholder="Enter your contact number" handleOnChange={handleOnChange} />
                </div>
                <div className='flex justify-around items-center space-x-8 text-white font-semibold text-sm'>
                    <div
                        className={`w-full text-center py-2 border rounded-md bg-gray-400 hover:bg-gray-500 cursor-pointer`}
                        onClick={() => { setOpen(false) }}
                    >
                        Cancel
                    </div>

                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-2 border border-transparent rounded-md bg-blue-700 hover:bg-blue-800 space-x-2`}
                        onClick={() => { handleUpdateProfile() }}
                    >
                        <span>Update</span>
                        {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className='bg-gray-50 text-gray-700 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>

                {
                    loading ? <LibownerProfileAnim /> : <>
                        <div className='pt-28 max-lg:pt-40'>
                            <div className='border bg-blue-100 max-w-screen-sm lg:h-56 mx-auto rounded-lg flex items-center justify-center p-2 relative'>

                                <FormModal open={open} setOpen={setOpen} fromHeading={"Library owner profile updation"}>
                                    {
                                        formTemplate()
                                    }
                                </FormModal>

                                <div className='absolute top-0 right-0 p-2'>
                                    <BiEdit size={25} onClick={() => { setOpen(!open); setStdProfileDet(studentDetails); }} className='cursor-pointer' />
                                </div>

                                <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 overflow-hidden rounded-md border bg-gray-200'>
                                    <img src={profilePic[studentDetails.profileImg]} alt='Profile Pic' className='w-full h-full object-cover' />
                                </div>

                                <div className='w-full py-4'>
                                    <div className='flex items-center justify-center flex-col max-lg:pt-12 text-center mb-2'>
                                        <h1 className='text-xl lg:text-2xl font-semibold'>{studentDetails.name}</h1>
                                        <h2 className='text-lg lg:text-xl font-semibold'>{studentDetails.city}, {studentDetails.pin}</h2>
                                    </div>

                                    <div className='text-center'>
                                        <div><span className='font-semibold'>Contact Number : </span><span>{studentDetails.contactnum}</span></div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='my-8 flex flex-col items-center justify-center'>
                            <div className='text-center pb-4'>
                                <h1 className='text-2xl md:text-3xl font-bold'>Location Info.</h1>
                                <p className='md:text-xl'>{studentDetails.city}, {studentDetails.pin}</p>
                            </div>
                            <div className='w-full lg:px-20'>
                                {
                                    studentDetails.googlemap ? <iframe title='map' src={studentDetails.googlemap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-[26rem]'></iframe> : <div className='border h-56 rounded-md bg-gray-200 flex items-center justify-center text-xl animate-pulse'>Library address is not found!</div>
                                }
                            </div>
                        </div>
                    </>
                }

                <div className="mb-6">
                    <LibraryDetails />
                </div>

                <RequestView />

            </div>
        </div>
    )
}

export default StudentProfile;