import React from 'react';
import MonthHeader from './MonthHeader';
import MonthTable from './MonthTable';

class Calendar extends React.Component {

    componentDidMount() {
        this.props.jumpDate(this.props.month, this.props.year, this.props.day);
    }

    render() {
        return(
            <div className={`calendar-container ${this.props.mincalendar ? `container-short mincalendar-container` : ''}`}>
                <MonthHeader
                    month={this.props.month}
                    year={this.props.year}
                    day={this.props.day}
                    prevMonth={this.props.prevMonth}
                    nextMonth={this.props.nextMonth}
                    jumpDate={this.props.jumpDate}
                    mincalendar={this.props.mincalendar}
                />
                <MonthTable
                    month={this.props.month}
                    year={this.props.year}
                    day={this.props.day}
                    fullMonth={this.props.fullMonth}
                    tasksInMonth={this.props.tasksInMonth}
                    selectDay={this.props.selectDay}
                    date={this.props.date}
                    mincalendar={this.props.mincalendar}
                    selectedDay={this.props.selectedDay}
                    closeCalendar={this.props.closeCalendar}
                />
            </div>
        );
    };
};

export default Calendar;