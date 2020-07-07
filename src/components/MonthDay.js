import React from 'react';

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