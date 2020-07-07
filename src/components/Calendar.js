import React from 'react';
import MonthHeader from './MonthHeader';
import MonthTable from './MonthTable';

class Calendar extends React.Component {
    render() {
        return(
            <div className='calendar-container'>
                <MonthHeader
                    month={this.props.month}
                    year={this.props.year}
                    prevMonth={this.props.prevMonth}
                    nextMonth={this.props.nextMonth}
                    showCalendar={this.props.showCalendar}
                />
                <MonthTable
                    month={this.props.month}
                    year={this.props.year}
                    fullMonth={this.props.fullMonth}
                />
            </div>
        );
    };
};

export default Calendar;