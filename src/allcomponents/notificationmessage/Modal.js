import React, { useContext } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import authContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiWarning } from 'react-icons/ci';

export const NotAllowed = ({ open, fromHeading, children }) => {

    const context = useContext(authContext);
    const { setIsloggedin, setLinks, setUserProfile } = context;

    const navigate = useNavigate(null);

    const handleLogout = () => {
        localStorage.removeItem("type");
        localStorage.removeItem("authtoken");
        localStorage.removeItem("isallowed");
        setLinks();
        setUserProfile("login");
        setIsloggedin(false);
        toast("User logout successfully!");
        navigate("/login");
    }

    return (
        <div onClick={() => { handleLogout() }} className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 px-4 transition-all duration-500 text-gray-700 ${open ? "bg-black/50 pointer-events-auto" : "invisible pointer-events-none"}`}>
            <div onClick={(e) => { e.stopPropagation() }} className={`w-full md:w-96 max-h-screen overflow-y-auto nobar bg-gray-200 rounded-lg transition-all ${open ? "scale-100" : "scale-0"} overflow-hidden py-1.5`}>
                <div className='text-center p-2'>
                    <div className=''>
                        <CiWarning size={40} className='mx-auto border rounded-md bg-yellow-400 p-0.5' />
                    </div>
                    <h1 className='text-lg font-semibold'>
                        {fromHeading}
                    </h1>
                    {
                        children
                    }
                    <button onClick={() => { handleLogout() }} className='rounded-lg bg-blue-600 px-8 py-1 font-semibold text-white hover:bg-blue-700 mt-2'>Logout</button>
                </div>


            </div>
        </div>
    )
}

export const PreviewModal = ({ open, setOpen, children }) => {
    return (
        <div onClick={() => { setOpen(!open) }} className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 px-6 md:px-12 transition-all duration-500 text-gray-700 ${open ? "bg-black/50 pointer-events-auto" : "invisible pointer-events-none"}`}>
            <div onClick={(e) => { e.stopPropagation() }} className={`w-[48rem] max-h-screen overflow-y-auto nobar rounded-lg transition-all ${open ? "scale-100" : "scale-0"} overflow-hidden py-1.5`}>
                {
                    children
                }
            </div>
        </div>
    )
}

export const SuccessModal = ({ open, setOpen, fromHeading, children }) => {
    return (
        <div onClick={() => { setOpen(!open) }} className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 px-4 transition-all duration-500 text-gray-700 ${open ? "bg-black/50 pointer-events-auto" : "invisible pointer-events-none"}`}>
            <div onClick={(e) => { e.stopPropagation() }} className={`w-full md:w-96 max-h-screen overflow-y-auto nobar bg-gray-200 rounded-lg transition-all ${open ? "scale-100" : "scale-0"} overflow-hidden py-1.5`}>
                <div className='h-40 flex w-80 -mt-20 mx-auto rounded-ee-full rounded-es-full bg-green-300'>
                    <div className='place-content-end mb-6 mx-auto'><TiTick className='text-black bg-white rounded-full' size={40} /></div>
                </div>
                <div className='text-center p-2'>
                    <h1 className='text-lg font-semibold'>
                        {fromHeading}
                    </h1>
                    {
                        children
                    }
                    <button onClick={() => { setOpen(!open) }} className='rounded-lg bg-blue-600 px-8 py-1 font-semibold text-white hover:bg-blue-700 mt-2'>Close</button>
                </div>


            </div>
        </div>
    )
}

export const FormModal = ({ open, setOpen, fromHeading, children }) => {
    return (
        <div onClick={() => { setOpen(!open) }} className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 px-4 transition-all duration-500 text-gray-700 ${open ? "bg-black/50 pointer-events-auto" : "invisible pointer-events-none"}`}>
            <div onClick={(e) => { e.stopPropagation() }} className={`w-full max-w-screen-sm max-h-screen overflow-y-auto nobar bg-gray-200 p-3 rounded-lg transition-all ${open ? "scale-100" : "scale-0"}`}>
                <div className='pb-0.5'>
                    <h1 className='text-xl text-center font-semibold'>
                        {fromHeading}
                    </h1>
                </div>

                {
                    children
                }

            </div>
        </div>
    )
}

const DeleteModal = ({ open, setOpen, handleDeleteEbook, children }) => {
    return (
        <div onClick={() => { setOpen(!open) }} className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 px-4 transition-all duration-500 text-gray-700 ${open ? "bg-black/50 pointer-events-auto" : "invisible pointer-events-none"}`}>
            <div onClick={(e) => { e.stopPropagation() }} className={`w-full md:w-96 max-h-screen overflow-y-auto nobar bg-gray-200 p-3 rounded-lg transition-all ${open ? "scale-100" : "scale-0"}`}>
                <div className=''>
                    <h2 className='text-center font-semibold'>Are you sure</h2>
                    <h1 className='text-xl text-center font-semibold'>You wanna delete this item?</h1>
                </div>

                {
                    children
                }

                <div className='flex justify-around items-center'>
                    <button className='rounded-lg bg-gray-400 px-12 py-2 font-semibold text-white hover:bg-gray-500' onClick={() => { setOpen(!open) }}>No</button>
                    <button onClick={() => { handleDeleteEbook() }} type='submit' className='rounded-lg bg-red-500 px-10 py-2 font-semibold text-white hover:bg-red-600 flex items-center space-x-1'><span>Yes</span> <MdDeleteForever /> </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;