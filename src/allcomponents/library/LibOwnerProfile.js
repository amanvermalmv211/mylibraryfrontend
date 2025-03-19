import React, { useContext, useEffect, useState } from 'react';
import { monthsname, userType } from '../../libs/AllRoutes';
import { useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FormModal, NotAllowed } from '../notificationmessage/Modal';
import { libownerProfileValidation } from '../../libs/Validation';
import { LibownerProfileAnim } from '../notificationmessage/SkeletonAnim';
import InputBox from '../notificationmessage/InputBox';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';

const LibOwnerProfile = () => {

  const context = useContext(authContext);
  const { invalidUser, loading, libraryDetails, setLibraryDetails, getLibOwner, activeStd } = context;

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

    document.title = "Library Owner - ML";
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate(null);

  const [open, setOpen] = useState(false);
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

  const [libownerProfile, setLibownerProfile] = useState(libraryDetails);

  const handleOnChange = (key, value) => {
    setLibownerProfile({
      ...libownerProfile,
      [key]: value
    })
  };

  const handleUpdateProfile = async () => {
    if (!libownerProfileValidation(libownerProfile)) { return }
    try {
      setSpinLoading(true);
      const response = await fetch(apiList.updatelibandprofile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem("authtoken")
        },
        body: JSON.stringify({ profileImg: libownerProfile.profileImg, ownername: libownerProfile.ownername, libname: libownerProfile.libname, contactnum: libownerProfile.contactnum, libcontactnum: libownerProfile.libcontactnum, localarea: libownerProfile.localarea, city: libownerProfile.city, state: libownerProfile.state, pin: libownerProfile.pin, googlemap: libownerProfile.googlemap })
      });

      const json = await response.json();
      if (json.success) {
        setLibraryDetails(json.data);
        toast.success(json.message)
        setOpen(false);
        setSpinLoading(false);
      }
      else {
        toast.warn(json.message);
        setOpen(false);
        setSpinLoading(false);
      }
    }
    catch (err) {
      toast.warn(`E-book : ${err.message}`);
      setSpinLoading(false);
      setOpen(false);
    }
  };

  const profilePic = [
    "https://png.pngtree.com/background/20230610/original/pngtree-profile-of-an-image-of-a-man-in-a-square-design-picture-image_3098265.jpg",
    "https://st.depositphotos.com/46542440/55684/i/450/depositphotos_556849354-stock-illustration-square-face-character-stiff-art.jpg",
    "https://static.vecteezy.com/system/resources/previews/027/224/407/original/girl-hugs-stack-of-books-standing-in-library-or-bookstore-and-rejoicing-at-opportunity-to-read-lot-png.png",
    "https://www.pngkey.com/png/detail/204-2049354_ic-account-box-48px-profile-picture-icon-square.png",
    "https://img.freepik.com/free-vector/icons-with-empty-square-templates_1308-85393.jpg",
    "https://img.freepik.com/premium-vector/line-art-diamonds-squares-brush-vector-illustration_756957-1433.jpg",
    "https://i.pinimg.com/564x/76/f0/11/76f0117bcced04cba3d2910007070b0d.jpg",
    "https://images.pexels.com/photos/25626523/pexels-photo-25626523.jpeg?cs=srgb&dl=pexels-googledeepmind-25626523.jpg&fm=jpg",
    "https://media.istockphoto.com/id/1216124671/photo/square-tubes.jpg?s=612x612&w=0&k=20&c=rJ2fybTzpiUK9LrPJ1ZRBKDp41Hpb5et1HvmkbJ1BkU="
  ]

  const formTemplate = () => {
    return (
      <form className="space-y-4 pb-1" onSubmit={(e) => e.preventDefault()}>
        <div className={`space-y-2`}>

          <div className="nobar grid grid-row-1 grid-flow-col gap-3 overflow-x-auto">
            {
              profilePic.map((data, idx) => {
                return <div className={`h-10 md:h-14 w-10 md:w-14 ${libownerProfile.profileImg === idx ? "border-2 border-blue-600" : "hover:border-2 hover:border-blue-500"} border rounded-md overflow-hidden cursor-pointer`} onClick={() => { handleOnChange("profileImg", idx) }}>
                  <img src={data} alt='Profile Pic' className='w-full h-full object-cover' />
                </div>
              })
            }
          </div>

          <div className='flex space-x-1.5'>
            <InputBox name="Name" id="ownername" type="text" value={libownerProfile.ownername} placeholder="Enter your name" handleOnChange={handleOnChange} />

            <InputBox name="Library Name" id="libname" type="text" value={libownerProfile.libname} placeholder="Enter name of the library" handleOnChange={handleOnChange} />
          </div>

          <div className='flex space-x-1.5'>
            <InputBox name="Contact No." id="contactnum" type="text" value={libownerProfile.contactnum} placeholder="Enter your contact number" handleOnChange={handleOnChange} />

            <InputBox name="Another Contact No." id="libcontactnum" type="text" value={libownerProfile.libcontactnum} placeholder="Enter another contact number" handleOnChange={handleOnChange} />
          </div>

          <div className='flex space-x-1.5'>
            <InputBox name="Local Area" id="localarea" type="text" value={libownerProfile.localarea} placeholder="Enter your Local area" handleOnChange={handleOnChange} />

            <InputBox name="City" id="city" type="text" value={libownerProfile.city} placeholder="Enter your city" handleOnChange={handleOnChange} />
          </div>

          <div className='flex space-x-1.5'>
            <InputBox name="State" id="state" type="text" value={libownerProfile.state} placeholder="Enter your state" handleOnChange={handleOnChange} />

            <InputBox name="PIN" id="pin" type="text" value={libownerProfile.pin} placeholder="Enter your area's pin" handleOnChange={handleOnChange} />
          </div>

          <InputBox name="Google Map Link" id="googlemap" type="text" value={libownerProfile.googlemap} placeholder="Enter embed google map link" handleOnChange={handleOnChange} />

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
                  <BiEdit size={25} onClick={() => { setOpen(!open); setLibownerProfile(libraryDetails); }} className='cursor-pointer' />
                </div>

                <div className='absolute max-lg:-top-14 lg:-left-14 h-28 w-28 overflow-hidden rounded-md border bg-gray-200'>
                  <img src={profilePic[libraryDetails.profileImg]} alt='Profile Pic' className='w-full h-full object-cover' />
                </div>

                <div className='w-full py-4'>
                  <div className='flex items-center justify-center flex-col max-lg:pt-12 text-center mb-4'>
                    <h1 className='text-xl lg:text-2xl font-semibold'>{libraryDetails.ownername}</h1>
                    <h2 className='text-lg lg:text-xl font-semibold'>{libraryDetails.libname}</h2>
                    <h2 className='text-lg lg:text-xl'>{libraryDetails.localarea} {libraryDetails.city}</h2>
                    <h2 className='text-lg lg:text-xl'>{libraryDetails.state} {libraryDetails.pin}</h2>
                  </div>

                  <div className='text-center'>
                    <div className='font-semibold'>Contact Number</div>
                    <div className='mb-2'>{libraryDetails.contactnum}, {libraryDetails.libcontactnum}</div>
                  </div>
                </div>

              </div>
            </div>

            <div className='max-w-80 mx-auto border border-blue-200 rounded-md bg-gradient-to-tl from-pink-200 to-blue-200 p-2 my-8 shadow-lg'>
              <h1 className='text-xl lg:text-2xl font-semibold text-center mb-2'>Subscription Details</h1>
              <div>
                <p><span className='font-semibold'>Active Students : </span><span>{activeStd}</span></p>
                <p><span className='font-semibold'>Subscription Date : </span><span>{new Date(libraryDetails.subscriptionDetails.subscriptionDate).getDate()} {monthsname[new Date(libraryDetails.subscriptionDetails.subscriptionDate).getMonth()]}, {new Date(libraryDetails.subscriptionDetails.subscriptionDate).getFullYear()}</span></p>

                <p><span className='font-semibold'>Expiry Date : </span><span className='text-red-600'>{new Date(libraryDetails.subscriptionDetails.expiryDate).getDate()} {monthsname[new Date(libraryDetails.subscriptionDetails.expiryDate).getMonth()]}, {new Date(libraryDetails.subscriptionDetails.expiryDate).getFullYear()}</span></p>
              </div>
            </div>

            <div className='my-8 flex flex-col items-center justify-center'>
              <div className='text-center pb-4'>
                <h1 className='text-2xl md:text-3xl font-bold'>Location Info.</h1>
                <p className='md:text-xl'>{libraryDetails.address}</p>
              </div>
              <div className='w-full lg:px-20'>
                <iframe title='map' src={libraryDetails.googlemap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-[26rem]'></iframe>
              </div>
            </div>

          </>
        }

        {
          localStorage.getItem("isallowed") !== "true" && <NotAllowed open={open} fromHeading="Currently you are not allowed!">
            <p>May be you do not got verified by the admin</p>
            <p>Our team will soon repond you as soon as you are get verified.</p>
          </NotAllowed>
        }

      </div>
    </div>
  )
}

export default LibOwnerProfile;