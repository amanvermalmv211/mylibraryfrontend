import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export const FormModal = ({ open, setOpen, fromHeading, children }) => {
    return (
        <div onClick={() => { setOpen(!open) }} className={`fixed inset-0 w-full h-full flex items-center justify-center z-50 px-4 transition-all duration-500 text-gray-700 ${open ? "bg-black/50 pointer-events-auto" : "invisible pointer-events-none"}`}>
            <div onClick={(e) => { e.stopPropagation() }} className={`w-full md:w-96 bg-gray-200 p-3 rounded-lg transition-all ${open ? "scale-100" : "scale-0"}`}>
                <div className=''>
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
            <div onClick={(e) => { e.stopPropagation() }} className={`w-full md:w-96 bg-gray-200 p-3 rounded-lg transition-all ${open ? "scale-100" : "scale-0"}`}>
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