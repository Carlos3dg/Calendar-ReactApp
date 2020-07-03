import React from 'react';

const MonthHeader = (props) => {
    return (
        <div>
            <h3>{`${props.months[props.month]} ${props.year}`}</h3>
        </div>
    );
};

export default MonthHeader;