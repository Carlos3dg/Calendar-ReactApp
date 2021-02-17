import apiClient from '../api/Client';
//DATE ACTIONS
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

//TASK ACTIONS
export function addTask(task, fullMonth) {
    return {
        type: 'ADD_TASK',
        task: task,
        fullMonth: fullMonth
    }
};

export function removeCurrentTask(task) {
    return {
        type: 'REMOVE_CURRENT_TASK',
        task,
    }
}

//FETCH TASK ACTIONS (used by an async action)
  //Actions used to get the tasks from the server and to know the actual status of that request
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
            .catch((resp) => {
                console.error('Bad Request: the server couldn\'t find the resource.')
                dispatch(fetchTaskFailure(resp))
            })
    }
}

//SAVE TASK ACTIONS (used by an async action)
  //Actions used to save tasks and to know the status of a task when is being saved by the server
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

//FETCH TOKEN ACTIONS (used by an async action)
  //Actions used to get the token from local storage and compare it with the real token from the server and also know the actual status of that request
export function fetchTokenPending(status) {
    return {
        type: 'FETCH_TOKEN_PENDING',
        tokenStatus: status
    }
}

export function fetchTokenFailure(status) {
    return {
        type: 'FETCH_TOKEN_FAILURE',
        tokenStatus: status,
    }
}

export function fetchTokenSuccess(calendarFakeAuth) {
    return {
        type: 'FETCH_TOKEN_SUCCESS',
        token: calendarFakeAuth.token,
        user: calendarFakeAuth.user,
        tokenStatus: 'SUCCESS',
    }
}

//Used in App component
export function fetchTokenRequest() {
    return async function(dispatch, getState) {
        dispatch(fetchTokenPending('PENDING'));
        const calendarFakeAuth = await apiClient.loadToken();
        const {error} = calendarFakeAuth;
        if(error) {
            dispatch(fetchTokenFailure('FAILURE'));
        } else {
            dispatch(fetchTokenSuccess(calendarFakeAuth));
        }
    }
}

//SET TOKEN ACTIONS (used by an async action)
  //Actions used to get the token from the server and to know the actual status of that request
export function setTokenPending(status) {
    return {
        type: 'SET_TOKEN_PENDING',
        tokenStatus: status,
    }
}

export function setTokenFailure(calendarFakeAuth, status) {
    return {
        type: 'SET_TOKEN_FAILURE',
        token: calendarFakeAuth.token,
        user: calendarFakeAuth.user,
        tokenStatus: status,
    }
}

export function setTokenSuccess(calendarFakeAuth, status) {
    return {
        type: 'SET_TOKEN_SUCCESS',
        token: calendarFakeAuth.token,
        user: calendarFakeAuth.user,
        tokenStatus: status,
    }    
}

//Used in Login component
export function setTokenRequest(user) {
    return async function(dispatch, getState) {
        dispatch(setTokenPending('PENDING'));
        const calendarFakeAuth = await apiClient.login(user);
        const {error} = calendarFakeAuth;
        if(error) {
            dispatch(setTokenFailure(calendarFakeAuth, 'FAILURE'));
        } else {
            dispatch(setTokenSuccess(calendarFakeAuth, 'SUCCESS'));
        }
    }
}

//Action used to remove the token from local storage and set the token value to null in our reducer
export function removeToken() {
    const calendarFakeAuth = apiClient.logout();

    return {
        type: 'REMOVE_TOKEN',
        token: calendarFakeAuth.token,
        user: calendarFakeAuth.user
    }
}
