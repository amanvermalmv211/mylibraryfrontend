import React from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';

const SingleEbook = ({ ebook, handleOpen }) => {    
    return (
        <>
            <div className='border border-gray-300 rounded-lg overflow-hidden w-full md:w-72 bg-gray-200 text-gray-700 relative'>

                <div className={`absolute top-0 left-0 p-1 ${localStorage.getItem("type") === 'editor' ? "block" : "invisible"}`}> <BiEdit size={20} className='hover:scale-110 cursor-pointer transition-all duration-200' onClick={()=>{handleOpen(ebook, true)}} /> </div>

                <div className={`absolute top-0 right-0 p-1 ${localStorage.getItem("type") === 'editor' ? "block" : "invisible"}`}> <RiDeleteBack2Line size={20} className='hover:scale-110 cursor-pointer transition-all duration-200' onClick={() => { handleOpen(ebook, false) }} /> </div>

                <div className='p-2 overflow-y-auto h-28 nobar'>
                    <h4 className='font-semibold text-xl text-center p-1'>{ebook.name}</h4>
                    <p className='text-start font-semibold'>Author : <span className='font-normal'>{ebook.authname}</span></p>
                    <p className='text-start font-semibold'>Published On : <span className='font-normal'>{ebook.published}</span></p>
                </div>
                <Link to={ebook.ebooklink} target='_blank' className='w-full block text-center p-1.5 bg-blue-500 hover:bg-blue-600 text-white'>Read Now</Link>
            </div>

        </>
    )
}

export default SingleEbook;