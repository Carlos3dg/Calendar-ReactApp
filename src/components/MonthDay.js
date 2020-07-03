import React from 'react';
import MonthTable from './MonthTable';

class MonthDay extends React.Component {
    
    render() {
        return (
            <div>
                {this.props.day}
            </div>
        );
    };
};

export default MonthDay;