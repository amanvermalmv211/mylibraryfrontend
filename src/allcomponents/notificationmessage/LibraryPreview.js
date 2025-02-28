import React from "react";
import { getEndTime, getStTime } from "../../libs/AllRoutes";

const LibraryPreview = ({ library }) => {
  if (!library) {
    return <p>No library details available.</p>;
  }

  return (
    <div className="bg-white max-w-screen-md shadow-md rounded-md p-4 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 text-center">{library.libname || "Library Name"}</h2>

      <div className="flex items-center md:justify-center flex-col space-y-3">
        <div className="flex max-md:flex-col md:items-center md:justify-around w-full max-md:space-y-3">
          <div className="w-full md:flex items-center justify-center flex-col">
            <p className="text-gray-600 font-semibold">Owner Name:</p>
            <p className="text-gray-800">{library.ownername}</p>
          </div>
          <div className="w-full md:flex items-center justify-center flex-col">
            <p className="text-gray-600 font-semibold">Contact:</p>
            <p className="text-gray-800">{library.contactnum}, {library.libcontactnum}</p>
          </div>
        </div>
        <div className="w-full md:flex items-center justify-center flex-col">
          <p className="text-gray-600 font-semibold">Address:</p>
          <p className="text-gray-800">
            {library.localarea}, {library.city}, {library.state} - {library.pin}
          </p>
        </div>
      </div>

      <div className="mt-4 md:grid grid-flow-row grid-cols-2 md:gap-10">
        {library.floors.map((floor, idxFloor) => (
          <div key={idxFloor} className="mb-4">
            <h3 className="text-xl font-bold text-gray-700">Floor {idxFloor}</h3>

            {floor.shifts.map((shift, idxShift) => (
              <div key={idxShift} className="mt-2 border-t pt-2">
                <h4 className="text-lg font-semibold text-blue-500">Shift {idxShift + 1}</h4>
                <p className="text-gray-600">Time Slot: {getStTime(shift)} - {getEndTime(shift)}</p>
                <p className="text-gray-600">Seats: Boys - {shift.numberOfSeats.filter(seat => seat.gender === "boy").length}, Girls - {shift.numberOfSeats.filter(seat => seat.gender === "girl").length}</p>
                <ul className="list-disc list-inside mt-2">
                  <p className="font-semibold text-gray-600">Price Options:</p>
                  {shift.price.map((priceOption, index) => (
                    <li key={index}>
                      {priceOption.duration}:{" "}
                      <span className="text-green-600">₹{priceOption.actualPrice}</span>{" "}
                      <span className="text-xs text-red-500 line-through">₹{Number(priceOption.actualPrice) + 200}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPreview;