import {getMonth} from '../helpers/calendarHelpers';

export default function dateReducer(
    state={
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    currentDay: null,
    fullMonth: null,
}, action) {
    switch(action.type) {
        case 'PREV_MONTH':
        case 'NEXT_MONTH': {
            let {currentMonth, currentYear} = prevAndNext(state, action);
            const fullMonth = getMonth(currentMonth, currentYear);

            return {
                ...state,
                currentMonth: currentMonth,
                currentYear: currentYear,
                fullMonth: fullMonth
            }
        }
        case 'JUMP_DATE': {
            const fullMonth = getMonth(action.month, action.year);
            return {
                ...state,
                currentMonth: action.month,
                currentYear: action.year,
                fullMonth: fullMonth
            }
        }
        case 'SELECT_DAY': {
            return {
                ...state,
                currentDay: action.day
            }
        }
        default: {
            return state;
        }
    }
}

function prevAndNext(state, action) {
    const date = Object.assign({}, state);
    let {currentMonth, currentYear} = date;
    switch(action.type) {
        case 'PREV_MONTH': {
            if(currentMonth === 0) {
                currentMonth = 11
                currentYear = currentYear - 1;
            } else {
                currentMonth = currentMonth - 1;
            }

            return {
                currentMonth,
                currentYear
            }
        }
        case 'NEXT_MONTH': {
            if(currentMonth === 11) {
                currentMonth = 0
                currentYear = currentYear + 1;
            } else {
                currentMonth = currentMonth + 1;
            }
            return {
                currentMonth,
                currentYear
            }
        }
        default: {
            return state
        }
    }
}