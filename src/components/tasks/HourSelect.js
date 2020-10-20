import React from 'react';

const HourSelect = (props) => (
    <div className={props.time.length ? 'time-select' : null} id={props.time.length===props.timeLength ? `start-select` : `end-select`}>
    {
        props.time.map((time, index) => (
            <div className='start-time-option' id={time.jsTime} key={index} onClick={()=>{
                props.time.length===props.timeLength 
                ? props.selectStartTime(time, 'div#start-select') 
                : props.selectEndTime(time, 'div#end-select')
            }}>
                <span>{time.time}</span>
            </div>
        ))
    }
    </div>
);

export default HourSelect;