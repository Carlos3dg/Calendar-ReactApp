import React from 'react';
import DateSelect from './DateSelect';

const MonthHeader = (props) => {
    return (
        <div className={`calendar-header ${!props.mincalendar ? `container` : 'min-calendar-header'}`}>
            <div className='arrow-month-container'>
                <span className="material-icons month-arrow-icon" onClick={() => props.prevMonth()}>
                    navigate_before
                </span>
            </div>
           <DateSelect
                month={props.month}
                year={props.year}
                jumpDate={props.jumpDate}
                mincalendar={props.mincalendar}
           />
            <div className='arrow-month-container'>
                <span className="material-icons month-arrow-icon" onClick={() => props.nextMonth()}>
                    navigate_next
                </span>
            </div>
        </div>
    );
};

export default MonthHeader;