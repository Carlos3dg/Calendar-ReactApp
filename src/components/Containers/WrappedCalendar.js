import Calendar from '../calendar/Calendar';
import {connect} from 'react-redux';
import {prevMonth, nextMonth, jumpDate, selectDay} from '../../actions/index';

const mapStateToCalendarProps = (state, ownProps) => {
    let tasksInMonth = [];
    //if mincalendar prop is undefined, proceed to get all the tasks inside the current month
    if(!ownProps.mincalendar) {
        state.taskList.forEach((task) => {
            const items = task.items.filter((item) => (
                (item.year === state.date.currentYear) && (item.month === state.date.currentMonth)
            ));

            if(items.length) {
                const newTask = {
                    ...task,
                    items: items
                };

                tasksInMonth = tasksInMonth.concat(newTask)
            }
        });
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