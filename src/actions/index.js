export function prevMonth() {
    return {
        type: 'PREV_MONTH'
    }
};

export function nextMonth() {
    return {
        type: 'NEXT_MONTH'
    }
}

export function jumpDate(month, year) {
    return {
        type: 'JUMP_DATE',
        month: month,
        year: year
    }
};

export function selectDay(day) {
    return {
        type: 'SELECT_DAY',
        day: day
    }
};

export function addTask(task, fullMonth) {
    return {
        type: 'ADD_TASK',
        task: task,
        fullMonth: fullMonth
    }
};