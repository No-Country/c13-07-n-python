import React, { useState } from 'react';
import './InputGroup.css';

const InputGroup = ({ title, type, placeholder, icon }) => {

    const [inputValue, setInputValue] = useState('');

    return (
        <div className='input-group'>
            <h2 className='title-input-group'>{title}</h2>
            <input
                className='entry-input-group'
                type={type}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <span>
                <img
                    className='img-input-group'
                    src={icon}
                    alt="icon" />
            </span>
        </div>
    );
}

export default InputGroup;
