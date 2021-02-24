import {getMonth} from '../helpers/calendarHelpers';

export default function dateReducer(
    state={
        mainCalendar: calendarReducer(undefined, {}),
        smallCalendar: calendarReducer(undefined, {}),
}, action) {
    switch(action.type) {
        case 'PREV_MONTH':
        case 'NEXT_MONTH':
        case 'JUMP_DATE':
        case 'SELECT_DAY': {
            const oldState = Object.assign({}, state);
            
            const mainCalendar = calendarReducer(oldState.mainCalendar, action);
            const smallCalendar = Object.assign({}, mainCalendar);
            
            return {
                mainCalendar,
                smallCalendar,
            };
        }
        case 'PREV_SMALL_MONTH':
        case 'NEXT_SMALL_MONTH':
        case 'JUMP_SMALL_DATE':
        case 'SELECT_SMALL_DAY': {
            const oldState = Object.assign({}, state);

            return {
                ...oldState,
                smallCalendar: calendarReducer(oldState.smallCalendar, action),
            };
        }
        default: {
            return state;
        }
    }
}

function calendarReducer(
    state = {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentDay: null,
        fullMonth: null,    
    }, action) {
    switch(action.type) {
        case 'PREV_MONTH':
        case 'NEXT_MONTH':
        case 'PREV_SMALL_MONTH':
        case 'NEXT_SMALL_MONTH': {
            let {currentMonth, currentYear} = prevAndNext(state, action);
            const fullMonth = getMonth(currentMonth, currentYear);

            return {
                ...state,
                currentMonth: currentMonth,
                currentYear: currentYear,
                fullMonth: fullMonth
            }
        }
        case 'JUMP_DATE':
        case 'JUMP_SMALL_DATE': {
            const fullMonth = getMonth(action.month, action.year);
            return {
                ...state,
                currentMonth: action.month,
                currentYear: action.year,
                currentDay: action.day,
                fullMonth: fullMonth
            }
        }
        case 'SELECT_DAY':
        case 'SELECT_SMALL_DAY': {
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
        case 'PREV_MONTH':
        case 'PREV_SMALL_MONTH': {
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
        case 'NEXT_MONTH':
        case 'NEXT_SMALL_MONTH': {
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