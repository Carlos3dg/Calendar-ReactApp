import apiClient from '../api/Client';

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

export function fetchTaskPending(status) {
    return {
        type: 'FETCH_TASK_PENDING',
        taskStatus: status
    }
}

export function fetchTaskSuccess(taskList) {
    return {
        type: 'FETCH_TASK_SUCCESS',
        taskStatus: 'SUCCESS',
        taskList: taskList
    }
}

export function fetchTaskFailure(status) {
    return {
        type: 'FETCH_TASK_FAILURE',
        taskStatus: status,
    }
}

export function fetchTaskRequest() {
    return function(dispatch, getState) {
        dispatch(fetchTaskPending('PENDING'));
        apiClient.loadTasks()
            .then((resp) => dispatch(fetchTaskSuccess(resp)))
            .catch((resp) => dispatch(fetchTaskFailure(resp)))
    }
}

export function saveTaskPending(status) {
    return {
        type: 'SAVE_TASK_PENDING',
        taskStatus: status
    }
}

export function saveTaskSuccess(status) {
    return {
        type: 'SAVE_TASK_SUCCESS',
        taskStatus: status
    }
}

export function saveTaskFailure(taskList) {
    return {
        type: 'SAVE_TASK_FAILURE',
        taskStatus: 'FAILURE',
        taskList: taskList
    }
}

export function closeTaskWarning(status, warningType) {
    return {
        type: 'CLOSE_TASK_WARNING',
        taskStatus: status,
        warningType: warningType,
    }
}

export function saveTaskRequest(newTask, fullMonth) {
    return async function(dispatch, getState) {
        dispatch(saveTaskPending('PENDING'));

        await dispatch(addTask(newTask, fullMonth));
        const newState = getState().taskList;
        
        apiClient.saveTask(newState)
            .then((resp) => dispatch(saveTaskSuccess(resp)))
            .catch((resp) => dispatch(saveTaskFailure(resp)))
    }
}