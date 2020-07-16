import Calendar from '../calendar/Calendar';
import {connect} from 'react-redux';
import {prevMonth, nextMonth, jumpDate, selectDay} from '../../actions/index';

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

export default WrappedCalendar;