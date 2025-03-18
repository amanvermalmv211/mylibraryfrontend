import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestLibAnim } from '../notificationmessage/SkeletonAnim';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';
import authContext from '../../context/auth/authContext';
import { getEndTime, getStTime, userType } from '../../libs/AllRoutes';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { PreviewModal } from '../notificationmessage/Modal';
import LibraryPreview from '../notificationmessage/LibraryPreview';
import { TbLibrary } from 'react-icons/tb';
import LibSeats from './LibSeats';
import { GiCrossMark } from 'react-icons/gi';
import { MdVerifiedUser } from 'react-icons/md';
import InputBox from '../notificationmessage/InputBox';
import { TiCancel } from 'react-icons/ti';
import norequest from '../images/norequest.svg';

const LibraryRequestSubs = () => {

  const navigate = useNavigate(null);
  const context = useContext(authContext);
  const { invalidUser, libraryDetails, setLibraryDetails, getLibOwner } = context;

  const [openPreview, setOpenPreview] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openCheckSeat, setOpenCheckSeat] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [actSeats, setActSeats] = useState([]);

  useEffect(() => {
    if (openPreview || openCheckSeat || openReject) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };

  }, [openPreview, openCheckSeat, openReject]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Request - ML";
    if (userType() !== "libowner") {
      invalidUser()
      navigate("/merilibrary-login")
      return;
    }
    if (!libraryDetails.ownername) {
      getLibOwner();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (libraryDetails._id) {
      setActSeats(libraryDetails.floors[0].shifts[0].numberOfSeats);
      getRequests();
    }
    // eslint-disable-next-line
  }, [libraryDetails]);


  const [loading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [subsDays, setSubsDays] = useState("");
  const priceOpt = ["30 Days", "60 Days", "90 Days", "180 Days", "365 Days"];

  const handleReject = async (data) => {
    setSelectedData(data);
    if (!openReject) {
      setOpenReject(true);
    }
    else {
      try {
        const response = await fetch(apiList.rejectrequest + `/${data._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem("authtoken")
          }
        });

        const json = await response.json();
        if (json.success) {
          setAllRequests(allRequests.filter((request) => { return request._id !== data._id }))
          toast.success(json.message);
        }
        else {
          toast.warn(json.message);
        }
      }
      catch (err) {
        toast.warn(`LibOwner Req: ${err.message}`);
      }
      setOpenReject(false);
    }
  }

  const handleCheckSeat = (data) => {
    setActSeats(libraryDetails.floors[data.idxFloor].shifts[data.idxShift].numberOfSeats)
    setSelectedData(data);
    if (libraryDetails.floors[data.idxFloor].shifts[data.idxShift].numberOfSeats[data.idxSeatSelected].isBooked) {
      toast.error(`Seat no. ${Number(data.idxSeatSelected) + 1} of shift ${Number(data.idxShift) + 1} on floor ${data.idxFloor} is is already booked`);
    }
    else {
      toast(`Seat no. ${Number(data.idxSeatSelected) + 1} of shift ${Number(data.idxShift) + 1} on floor ${data.idxFloor} is available`);
    }
    setOpenCheckSeat(true);
  }

  const handleApprove = async (data) => {
    setSelectedData(data);
    if (!openApprove) {
      setOpenApprove(true);
      setSubsDays("");
      document.getElementById("priceopt").selectedIndex = 0;
      return;
    }
    if (!subsDays) {
      return toast.warn("Please select the subscription duration.");
    }

    const selectedDate = new Date(subsDays);
    const currentDate = new Date();

    // Remove time part from both dates to compare only the dates
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= currentDate) {
      return toast.warn("The selected date must be in the future.");
    }

    try {
      const response = await fetch(apiList.approverequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({
          requestId: selectedData._id,
          subsDays: selectedDate
        }),
      });

      const json = await response.json();
      if (json.success) {
        setLibraryDetails(json.data);
        setAllRequests(allRequests.filter((request) => request._id !== data._id));
        toast.success(json.message);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error(`Approval Error: ${err.message}`);
    }

    setOpenApprove(false);
  }

  const handleDateChange = async (_, value) => {
    setSubsDays(value);
    document.getElementById("priceopt").selectedIndex = 0;
  }

  const handleDateSelect = (e) => {
    const selectedDuration = priceOpt[e.target.value];
    setSubsDays("");

    const currentDate = new Date();
    let daysToAdd = 0;

    if (selectedDuration === "30 Days") {
      daysToAdd = 30;
    }
    else if (selectedDuration === "60 Days") {
      daysToAdd = 60;
    }
    else if (selectedDuration === "90 Days") {
      daysToAdd = 90;
    }
    else if (selectedDuration === "180 Days") {
      daysToAdd = 180;
    }
    else if (selectedDuration === "365 Days") {
      daysToAdd = 365;
    }

    const newDate = new Date(currentDate.setDate(currentDate.getDate() + daysToAdd));
    setSubsDays(newDate.toISOString().split("T")[0]);
  };

  const getRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiList.joinrequest + `/${libraryDetails._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem("authtoken")
        }
      });

      const json = await response.json();
      if (json.success) {
        setAllRequests(json.data);
        setLoading(false);
      }
      else {
        toast.warn(json.message);
        setLoading(false);
      }
    }
    catch (err) {
      toast.warn(`LibOwner Req: ${err.message}`);
    }
  }

  return (
    <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className='pt-28 text-gray-700'>
          <h1 className='text-2xl md:text-4xl font-bold text-center mb-4'>Requests To Join Library</h1>
          {
            libraryDetails._id && <>
              <PreviewModal open={openPreview} setOpen={setOpenPreview}>
                <div className='my-4'>
                  <LibraryPreview library={libraryDetails} />
                </div>
              </PreviewModal>

              <PreviewModal open={openCheckSeat} setOpen={setOpenCheckSeat}>
                {selectedData.studentId &&
                  <div className='text-center my-1 rounded-md bg-gray-100 md:text-lg'>Seats layout in shift {Number(selectedData.idxShift) + 1} of floor {selectedData.idxFloor} <span className='max-md:block'>select by {selectedData.studentId.name}</span></div>
                }
                <LibSeats actSeats={actSeats} hadleSeatGender={() => { return }} />
              </PreviewModal>

              <PreviewModal open={openReject} setOpen={setOpenReject}>
                <div className='max-w-96 border bg-gray-100 rounded-md text-center mx-auto'>
                  <h1 className='text-lg my-1'>Are you sure?</h1>
                  {selectedData.studentId &&
                    <p className='text-lg'>Reject request from <span className='font-semibold'>{selectedData.studentId.name}</span> for seat number {Number(selectedData.idxSeatSelected) + 1} in shift {Number(selectedData.idxShift) + 1} of floor {selectedData.idxFloor}</p>
                  }

                  <div className='flex items-center justify-around space-x-4 px-2 my-2'>
                    <button
                      type="button" className={`w-full p-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      onClick={() => { setOpenReject(false) }}
                    >
                      <span>Cancel <TiCancel size={18} className='inline-block mb-0.5' /></span>
                    </button>
                    <button
                      type="button" className={`w-full p-1 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                      onClick={() => { handleReject(selectedData) }}
                    >
                      <span>Reject Request <GiCrossMark size={18} className='inline-block' /></span>
                    </button>
                  </div>

                </div>
              </PreviewModal>

              <PreviewModal open={openApprove} setOpen={setOpenApprove}>
                <div className='border bg-gray-100 rounded-md text-center'>
                  <h1 className='text-lg mt-1 -mb-2'>Are you sure?</h1>
                  <h2 className='text-lg mb-1'>You want to approve this request!</h2>
                  {selectedData.studentId &&
                    <>
                      <p className='text-lg'>Approve request from <span className='font-semibold'>{selectedData.studentId.name}</span> for seat number {Number(selectedData.idxSeatSelected) + 1} in shift {Number(selectedData.idxShift) + 1} of floor {selectedData.idxFloor}</p>
                      <p><span className='font-semibold'>From:</span> {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()} <span className='font-semibold'>to:</span> {subsDays ? <>{new Date(subsDays).getDate()}/{new Date(subsDays).getMonth() + 1}/{new Date(subsDays).getFullYear()}</> : "_ _ _ _ _ _ _ _"}</p>
                    </>
                  }

                  <div className='flex max-md:flex-col items-center justify-around md:space-x-4 text-start my-3 mb-4'>
                    <div className='w-60'>
                      <InputBox name="Choose Date" id="date" type="date" value={subsDays} placeholder="Select date" handleOnChange={handleDateChange} />
                    </div>

                    <p className='font-bold text-lg'>OR</p>

                    <div className='w-60'>
                      <label htmlFor="priceopt" className="px-1 text-sm">Select Duration</label>
                      <select name="priceopt" id="priceopt" className='rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                        onChange={(e) => { handleDateSelect(e) }}
                        defaultValue=""
                      >
                        <option value="" disabled>Select duration</option>
                        {
                          priceOpt.map((duration, idx) => {
                            return <option key={idx} value={idx}>{duration}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className='flex items-center justify-around space-x-4 px-2 my-2'>
                    <button
                      type="button" className={`w-full p-1 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                      onClick={() => { setOpenApprove(false) }}
                    >
                      <span>Cancel <TiCancel size={18} className='inline-block mb-0.5' /></span>
                    </button>
                    <button
                      type="button" className={`w-full p-1 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                      onClick={() => { handleApprove(selectedData) }}
                    >
                      <span>Approve <MdVerifiedUser size={18} className='inline-block mb-0.5' /></span>
                    </button>
                  </div>

                </div>
              </PreviewModal>

              <button
                type="button" className={`w-full md:w-72 py-2 px-3 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-1 mx-auto mb-8`}
                onClick={() => { setOpenPreview(true) }}
              >
                <span>Preview Library Details</span>
                <TbLibrary size={18} />
              </button>
            </>
          }

          {
            loading ? <RequestLibAnim /> :
              <div className='grid md:grid-cols-3 gap-4'>
                {
                  allRequests.map((data, idx) => {
                    return <div key={idx} className='rounded-md overflow-hidden border border-gray-300 shadow-lg'>
                      <div className='flex items-center justify-between py-0.5 px-3 text-lg lg:text-xl font-semibold bg-blue-600 text-white'>
                        <div>{data.studentId.name}</div>
                        <Link to={`tel:+91${data.studentId.contactnum}`}><BiSolidPhoneCall /></Link>
                      </div>
                      <div className='max-lg:text-sm p-2'>
                        <div>{data.libname}</div>
                        <div className='flex items-center justify-between'>
                          <div>{data.studentId.city}</div>
                          <Link to={`tel:+91${data.studentId.contactnum}`}>{data.studentId.contactnum}</Link>
                        </div>
                        <div>Requested for seat no. {Number(data.idxSeatSelected) + 1} of shift {Number(data.idxShift) + 1} ({getStTime(libraryDetails.floors[data.idxFloor].shifts[data.idxShift])} - {getEndTime(libraryDetails.floors[data.idxFloor].shifts[data.idxShift])}) on Floor {data.idxFloor}</div>
                        <div className='flex items-center justify-center space-x-2 text-sm mt-1.5'>
                          <button
                            type="button"
                            className={`w-full p-1 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                            onClick={() => { handleReject(data) }}
                          >
                            <span>Reject</span>
                          </button>
                          <button
                            type="button"
                            className={`w-full p-1 rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            onClick={() => { handleCheckSeat(data) }}
                          >
                            <span>Check Seat</span>
                          </button>
                          <button
                            type="button"
                            className={`w-full p-1 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                            onClick={() => { handleApprove(data) }}
                          >
                            <span>Approve</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
          }
          {
            !loading && allRequests.length === 0 && <>
              <div className='h-96 flex flex-col items-center justify-center'>
                <div>
                  <img src={norequest} alt='Not Found' className='w-full h-full' />
                </div>
                <div className='font-bold text-2xl md:text-4xl text-center'>There is no requests for the approval!</div>
              </div>
            </>
          }

        </div>

      </div>
    </div>
  )
}

export default LibraryRequestSubs;