import React from 'react';
import MonthTable from './MonthTable';

class MonthDay extends React.Component {
    
    render() {
        return (
            <div>
                <span>{this.props.day}</span>
            </div>
        );
    };
};

export default MonthDay;