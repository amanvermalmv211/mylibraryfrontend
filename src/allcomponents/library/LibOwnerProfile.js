import React, { useContext, useEffect, useState } from 'react';
import { userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FormModal } from '../notificationmessage/Modal';
import { libownerProfileValidation } from '../../libs/Validation';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';

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
    name: "",
    firmname: "",
    contactnum: "",
    emgcontactnum: "",
    address: "",
    maplink: ""
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
          {/* <div>
            Select Profile Picture
            <div className='w-14 h-14 rounded-full'>
              <img src='https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg' alt='Profile' className='rounded-full w-full h-full'/>
            </div>
          </div> */}

          <div>
            <label htmlFor="name" className="block ml-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Enter your name"
              className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              value={libownerProfile.name}
              onChange={(event) => { handleOnChange("name", event.target.value) }}
            />
          </div>

          <div>
            <label htmlFor="firmname" className="block ml-1">Library Name</label>
            <input
              type="text"
              id="firmname"
              name="firmname"
              autoComplete="firmname"
              required
              placeholder="Enter name of the library"
              className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              value={libownerProfile.firmname}
              onChange={(event) => { handleOnChange("firmname", event.target.value) }}
            />
          </div>

          <div>
            <label htmlFor="contactnum" className="block ml-1">Contact No.</label>
            <input
              type="text"
              id="contactnum"
              name="contactnum"
              autoComplete="contactnum"
              required
              placeholder="Enter your contact number"
              className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              value={libownerProfile.contnum}
              onChange={(event) => { handleOnChange("contactnum", event.target.value) }}
            />
          </div>

          <div>
            <label htmlFor="emgcontactnum" className="block ml-1">Secondary Contact No.</label>
            <input
              type="text"
              id="emgcontactnum"
              name="emgcontactnum"
              autoComplete="emgcontactnum"
              required
              placeholder="Enter another contact number for emergency"
              className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              value={libownerProfile.emgcontactnum}
              onChange={(event) => { handleOnChange("emgcontactnum", event.target.value) }}
            />
          </div>

          <div>
            <label htmlFor="address" className="block ml-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="address"
              required
              placeholder="Enter the library address"
              className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              value={libownerProfile.address}
              onChange={(event) => { handleOnChange("address", event.target.value) }}
            />
          </div>

          <div>
            <label htmlFor="maplink" className="block ml-1">Google Map Link</label>
            <input
              type="text"
              id="maplink"
              name="maplink"
              autoComplete="maplink"
              required
              placeholder="Enter embed google map link"
              className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              value={libownerProfile.maplink}
              onChange={(event) => { handleOnChange("maplink", event.target.value) }}
            />
          </div>

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
                    <h1 className='text-xl lg:text-2xl font-semibold'>Library Owner Name</h1>
                    <h2 className='text-lg lg:text-xl font-semibold'>Here We will display the nameof the library</h2>
                  </div>

                  <div className='text-center'>
                    <div><span className='font-semibold'>Contact Number : </span><span>6306805527, 9795544677</span></div>
                    <div><span className='font-semibold'>Active Students : </span><span>200</span></div>
                  </div>
                </div>

              </div>
            </div>

            <div className='my-8 flex flex-col items-center justify-center'>
              <div className='text-center pb-4'>
                <h1 className='text-2xl md:text-3xl font-bold'>Location Info.</h1>
                <p className='md:text-xl'>Tedhi Bazar Post: Markeengang Ghazipur 233001</p>
              </div>
              <div className='w-full lg:px-20'>
                <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14791.430570874723!2d83.55957323380159!3d25.571753342118296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991ff08605d2193%3A0x71b090d70df7402!2sMount%20Litera%20Zee%20School!5e0!3m2!1sen!2sin!4v1727185211467!5m2!1sen!2sin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='w-full h-[26rem]'></iframe>
              </div>
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default LibOwnerProfile;