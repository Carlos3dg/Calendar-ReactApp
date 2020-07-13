import React from 'react';
import MonthHeader from './MonthHeader';
import MonthTable from './MonthTable';

class Calendar extends React.Component {
    componentDidMount() {
        this.props.jumpDate(this.props.month, this.props.year);
    }

    render() {
        return(
            <div className='calendar-container'>
                <MonthHeader
                    month={this.props.month}
                    year={this.props.year}
                    prevMonth={this.props.prevMonth}
                    nextMonth={this.props.nextMonth}
                    jumpDate={this.props.jumpDate}
                />
                <MonthTable
                    month={this.props.month}
                    year={this.props.year}
                    fullMonth={this.props.fullMonth}
                    selectDay={this.props.selectDay}
                    date={this.props.date}
                />
            </div>
        );
    };
};

export default Calendar;