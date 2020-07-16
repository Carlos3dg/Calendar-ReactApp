import React from 'react';
import Calendar from './calendar/Calendar';
import Tasks from './tasks/Tasks';
import {connect} from 'react-redux';
import {prevMonth, nextMonth, jumpDate, selectDay} from '../actions/index';

const App = (props) => {
        return(
            <div className='container'>
                <header>
                    <h1>Calendar App</h1>
                </header>
                <main className='main-container'>
                    <WrappedCalendar
                        date={props.date}
                    />
                    <TaskDisplay/>
                </main>
            </div>
        );
}

const mapStateToCalendarProps = (state) => {
    return {
        month: state.date.currentMonth,
        year: state.date.currentYear,
        fullMonth: state.date.fullMonth,
    }
}

const mapDispatchToCalendarProps = (dispatch) => {
    return {
        prevMonth: ()=>dispatch(prevMonth()),
        nextMonth: ()=>dispatch(nextMonth()),
        jumpDate: (month, year)=>dispatch(jumpDate(month, year)),
        selectDay: (day)=>dispatch(selectDay(day)),
    }
}

const WrappedCalendar = connect(
    mapStateToCalendarProps,
    mapDispatchToCalendarProps
)(Calendar);

const mapStateToTasksProps = (state) => {
    return {
        day: state.date.currentDay,
        month: state.date.currentMonth,
        year: state.date.currentYear,
        fullMonth: state.date.fullMonth,
        taskList: state.taskList
    }
};

const TaskDisplay = connect(
    mapStateToTasksProps,
    {test: ()=>'hi'}
)(Tasks);

export default App;