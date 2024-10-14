import React from 'react';

const InputBox = (props) => {

    const {name, id, type, value, placeholder, handleOnChange} = props;

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