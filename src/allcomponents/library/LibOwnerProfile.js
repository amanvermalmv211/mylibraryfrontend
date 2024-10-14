import React, { useContext, useEffect, useState } from 'react';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FormModal } from '../notificationmessage/Modal';
import { libownerProfileValidation } from '../../libs/Validation';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';
import InputBox from '../notificationmessage/InputBox';

const LibOwnerProfile = () => {

  useEffect(() => {
    if (userType() !== "libowner") {
      invalidUser()
      navigate("/login")
      return;
    }
    // eslint-disable-next-line
  }, [])

  const context = useContext(authContext);
  const { invalidUser } = context;
  const navigate = useNavigate(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinLoading, setSpinLoading] = useState(false);

  useEffect(() => {
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

  const [libownerProfile, setLibownerProfile] = useState({
    name: "Library Owner Name",
    firmname: "Here We will display the name of the library",
    contactnum: "6306805527",
    emgcontactnum: "9455333762",
    address: "Tedhi Bazar Post: Markeenganj Ghazipur 233001",
    maplink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14791.430570874723!2d83.55957323380159!3d25.571753342118296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991ff08605d2193%3A0x71b090d70df7402!2sMount%20Litera%20Zee%20School!5e0!3m2!1sen!2sin!4v1727185211467!5m2!1sen!2sin"
  });

  const handleOnChange = (key, value) => {
    setLibownerProfile({
      ...libownerProfile,
      [key]: value
    })
  };

  const handleUpdateProfile = () => {
    if (!libownerProfileValidation(libownerProfile)) { return }
    setLoading(false);
    setOpen(false)

  };

  const formTemplate = (buttonText) => {
    return (
      <form className="space-y-4 pb-4 overflow-y-auto nobar" onSubmit={(e) => e.preventDefault()}>
        <div className={`space-y-2`}>

          <InputBox name="Name" id="name" type="text" value={libownerProfile.name} placeholder="Enter your name" handleOnChange={handleOnChange} />

          <InputBox name="Library Name" id="firmname" type="text" value={libownerProfile.firmname} placeholder="Enter name of the library" handleOnChange={handleOnChange} />

          <InputBox name="Contact No." id="contactnum" type="text" value={libownerProfile.contactnum} placeholder="Enter your contact number" handleOnChange={handleOnChange} />

          <InputBox name="Secondary Contact No." id="emgcontactnum" type="text" value={libownerProfile.emgcontactnum} placeholder="Enter another contact number" handleOnChange={handleOnChange} />

          <InputBox name="Address" id="address" type="text" value={libownerProfile.address} placeholder="Enter the library address" handleOnChange={handleOnChange} />

          <InputBox name="Google Map Link" id="maplink" type="text" value={libownerProfile.maplink} placeholder="Enter embed google map link" handleOnChange={handleOnChange} />

        </div>
        <div className='flex justify-around items-center space-x-4 text-white font-semibold text-sm'>
          <div
            className={`w-full text-center py-2 px-4 border rounded-md bg-gray-400 hover:bg-gray-500 cursor-pointer`}
            onClick={() => { setOpen(false) }}
          >
            Cancel
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md bg-blue-700 hover:bg-blue-800 space-x-2`}
            onClick={() => { handleUpdateProfile() }}
          >
            <span>{buttonText}</span>
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
              <div className='border bg-blue-100 max-w-screen-sm lg:h-48 mx-auto rounded-lg flex items-center justify-center p-2 relative'>

                <FormModal open={open} setOpen={setOpen} fromHeading={"Library owner profile updation"}>
                  {
                    formTemplate("Update Profile")
                  }
                </FormModal>

                <div className='absolute top-0 right-0 p-2'>
                  <BiEdit size={20} onClick={() => { setOpen(!open) }} className='cursor-pointer' />
                </div>

                <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 overflow-hidden rounded-md border border-black bg-gray-200'>
                  <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg' alt='Profile Pic' className='w-full h-full object-cover' />
                </div>

                <div className='w-full py-4'>
                  <div className='flex items-center justify-center flex-col max-lg:pt-12 text-center mb-4'>
                    <h1 className='text-xl lg:text-2xl font-semibold'>{libownerProfile.name}</h1>
                    <h2 className='text-lg lg:text-xl font-semibold'>{libownerProfile.firmname}</h2>
                  </div>

                  <div className='text-center'>
                    <div><span className='font-semibold'>Contact Number : </span><span>{libownerProfile.contactnum}, {libownerProfile.emgcontactnum}</span></div>
                    <div><span className='font-semibold'>Active Students : </span><span>200</span></div>
                  </div>
                </div>

              </div>
            </div>

            <div className='my-8 flex flex-col items-center justify-center'>
              <div className='text-center pb-4'>
                <h1 className='text-2xl md:text-3xl font-bold'>Location Info.</h1>
                <p className='md:text-xl'>{libownerProfile.address}</p>
              </div>
              <div className='w-full lg:px-20'>
                <iframe title='map' src={libownerProfile.maplink} loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-[26rem]'></iframe>
              </div>
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default LibOwnerProfile;