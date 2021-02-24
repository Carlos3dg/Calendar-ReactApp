import Calendar from '../calendar/Calendar';
import {connect} from 'react-redux';
import {
    prevMonth, 
    nextMonth, 
    jumpDate, 
    selectDay,
    prevSmallMonth,
    nextSmallMonth,
    jumpSmallDate,
    selectSmallDay,
} from '../../actions/index';

const mapStateToCalendarProps = (state, ownProps) => {
    let tasksInMonth = [];
    //if mincalendar prop is undefined, proceed to get all the tasks inside the current month
    if(!ownProps.mincalendar) {
        const {currentMonth, currentYear, currentDay, fullMonth} = state.date.mainCalendar
        state.taskList.forEach((task) => {
            const items = task.items.filter((item) => (
                (item.year === currentYear) && (item.month === currentMonth)
            ));

            if(items.length) {
                const newTask = {
                    ...task,
                    items: items
                };

                tasksInMonth = tasksInMonth.concat(newTask)
            }
        });

        return {
            month: currentMonth,
            year: currentYear,
            day: currentDay,
            fullMonth: fullMonth,
            tasksInMonth: tasksInMonth
        }
    } else {
        const {currentMonth, currentYear, currentDay, fullMonth} = state.date.smallCalendar
        return {
            month: currentMonth,
            year: currentYear,
            day: currentDay,
            fullMonth: fullMonth,
            tasksInMonth: tasksInMonth
        }
    }
}

const mapDispatchToCalendarProps = (dispatch, ownProps) => {
    if(!ownProps.mincalendar) {
        return {
            prevMonth: ()=>dispatch(prevMonth()),
            nextMonth: ()=>dispatch(nextMonth()),
            jumpDate: (month, year, day)=>dispatch(jumpDate(month, year, day)),
            selectDay: (day)=>dispatch(selectDay(day)),
        }
    } else {
        return {
            prevMonth: ()=>dispatch(prevSmallMonth()),
            nextMonth: ()=>dispatch(nextSmallMonth()),
            jumpDate: (month, year, day)=>dispatch(jumpSmallDate(month, year, day)),
            selectDay: (day)=>dispatch(selectSmallDay(day)),
        }
    }
}

const WrappedCalendar = connect(
    mapStateToCalendarProps,
    mapDispatchToCalendarProps
)(Calendar);

export default WrappedCalendar;