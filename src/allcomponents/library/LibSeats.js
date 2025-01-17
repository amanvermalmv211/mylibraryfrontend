import React from 'react'
import { PiChairFill } from 'react-icons/pi';

const LibSeats = (props) => {
    const { actSeats, hadleSeatGender } = props;
    return (
        <div className='flex justify-center'>
            <div className='grid grid-flow-row gap-1 grid-cols-12 border border-blue-200 place-items-center py-4 w-full p-1 rounded-lg bg-gradient-to-tl from-blue-200 to-pink-100'>

                {
                    actSeats.map((data, idx) => {
                        return <Seats key={idx} data={data} idx={idx} hadleSeatGender={hadleSeatGender} />
                    })
                }

            </div>
        </div>
    )
}

export default LibSeats;

export const Seats = (props) => {
    const { data, idx, hadleSeatGender } = props;
    return (
        <div key={idx} onClick={() => { hadleSeatGender(idx) }} className='cursor-pointer select-none group'>
            <div className={`${(idx <= 11) || (idx > 23 && idx <= 35) || (idx > 47 && idx <= 59) || (idx > 71 && idx <= 83) || (idx > 95 && idx <= 107) ? "h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md ${data.isBooked ? data.gender === "boy" ? "bg-blue-300" : "bg-pink-300" : data.gender === "boy" ? "bg-blue-500 group-hover:bg-blue-600" : "bg-pink-500 group-hover:bg-pink-600"}`}>{idx + 1}</div>

            <PiChairFill key={idx} size={25} className={`${(idx <= 11) || (idx > 23 && idx <= 35) || (idx > 47 && idx <= 59) || (idx > 71 && idx <= 83) ? "mb-4" : ""} md:w-12 ${data.isBooked ? "text-gray-400" : "text-gray-600 group-hover:text-gray-700"}`} />

            <div className={`${(idx > 11 && idx <= 23) || (idx > 35 && idx <= 47) || (idx > 59 && idx <= 71) || (idx > 83 && idx <= 95) ? "h-5 block" : "hidden"} text-white flex items-center justify-center text-sm rounded-sm md:rounded-md ${data.isBooked ? data.gender === "boy" ? "bg-blue-300" : "bg-pink-300" : data.gender === "boy" ? "bg-blue-500 group-hover:bg-blue-600" : "bg-pink-500 group-hover:bg-pink-600"}`}>{idx + 1}</div>

        </div>
    )
}