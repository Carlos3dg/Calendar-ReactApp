import React from 'react';

const MonthHeader = (props) => {
    return (
        <div className='container calendar-header'>
            <div className='arrow-month-container'>
                <span className="material-icons month-arrow-icon" onClick={() => props.prevMonth()}>
                    navigate_before
                </span>
            </div>
            <h2>{`${props.months[props.month]} ${props.year}`}</h2>
            <div className='arrow-month-container'>
                <span className="material-icons month-arrow-icon" onClick={() => props.nextMonth()}>
                    navigate_next
                </span>
            </div>
        </div>
    );
};

export default MonthHeader;