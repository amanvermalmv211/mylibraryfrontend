import React from 'react';

export const SelectBox = (props) => {

    const { name, id, value, idx, handleOnChange } = props;

    return (
        <div className='w-full'>
            <label htmlFor={id} className="px-1 text-sm">{name}</label>
            <select name={id} id={id} className='appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                onChange={(e) => { handleOnChange(idx, e) }}
                value={value}
            >
                {
                    Array(24).fill().map((_, idx) => {
                        return <option key={idx} value={idx}>{idx === 0 ? `12 AM`: idx <12 ? `${idx} AM` : idx === 12 ? `${idx} PM` : `${idx-12} PM`}</option>
                    })
                }
            </select>
        </div>
    )
}

export const ShiftInputBox = (props) => {

    const { name, idx, id, type, value, placeholder, handleOnChange } = props;

    return (
        <div className='w-full'>
            <label htmlFor={id} className="px-1 text-sm">
                {name}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={id}
                required
                className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={placeholder}
                value={value}
                onChange={(event) => { handleOnChange(idx, event) }}
            />
        </div>
    )
}

const InputBox = (props) => {

    const { name, id, type, value, placeholder, handleOnChange } = props;

    return (
        <div className='w-full'>
            <label htmlFor={id} className="px-1 text-sm">
                {name}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={id}
                required
                className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={placeholder}
                value={value}
                onChange={(event) => { handleOnChange(id, event.target.value) }}
            />
        </div>
    )
}

export default InputBox;