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

const apiClient = {
    loadTasks: function() {
        const success = true;
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if(!success) return reject('FAILURE');
                resolve(JSON.parse(localStorage.taskList || '[]'));
            }, 1500);
        })
    }
}