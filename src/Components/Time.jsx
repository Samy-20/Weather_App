import React, { useState, useEffect } from 'react';
import './Time.css'

const Time = (ref) => {
    // State to hold the current date and time
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Effect to update the date and time every second
    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    // Format the date and time as needed
    const option = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = currentDateTime.toLocaleDateString( undefined, option );

    const hours = currentDateTime.getHours(ref);
    const minutes = currentDateTime.getMinutes(ref);
    const seconds = currentDateTime.getSeconds(ref);

    return (
        <div className='box'>
            <p className='date'>{formattedDate}</p>
            <div className='time'>
                <div className="time-list" id='hours'>{hours}</div>
                <p>:</p>
                <div className="time-list" id='minute'>{minutes}</div>
                <p>:</p>
                <div className="time-list" id='second'>{seconds}</div>
            </div>
        </div>
    );
};

export default Time;