import Calendar from '../calendar/Calendar';
import {connect} from 'react-redux';
import {prevMonth, nextMonth, jumpDate, selectDay} from '../../actions/index';

const mapStateToCalendarProps = (state, ownProps) => {
    let tasksInMonth;
    //if mincalendar prop is undefined, proceed to get all the tasks inside the current month
    if(!ownProps.mincalendar) {
        const taskInYear = state.taskList.find(task => (
            task.year === state.date.currentYear
        ));

        if(taskInYear) {
            tasksInMonth = taskInYear.months.find(task => (
                task.month === state.date.currentMonth
            ))
        }
    }

    return {
        month: state.date.currentMonth,
        year: state.date.currentYear,
        fullMonth: state.date.fullMonth,
        tasksInMonth: tasksInMonth
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

export default WrappedCalendar;