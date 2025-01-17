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

const LibraryRequestSubs = () => {

  const navigate = useNavigate(null);
  const context = useContext(authContext);
  const { invalidUser, libraryDetails, getLibOwner } = context;

  const [openPreview, setOpenPreview] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openCheckSeat, setOpenCheckSeat] = useState(false);
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
      navigate("/login")
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

  const handleReject = async (data) => {
    setSelectedData(data);
    if (!openReject) {
      setOpenReject(true);
    }
    else {
      try {
        const response = await fetch(apiList.rejectrequest, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem("authtoken")
          },
          body: JSON.stringify({data: selectedData})
        });

        const json = await response.json();
        if (json.success) {
          setAllRequests(allRequests.filter((request)=>{return request._id !== data._id}))
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
                      <span>Cancel</span>
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
                      <div className='flex items-center justify-between px-2 lg:text-xl font-semibold bg-blue-600 text-white'>
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
                            onClick={() => { toast("Hello") }}
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
              <div className='h-96 flex items-center justify-center'>
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