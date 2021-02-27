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

export function jumpDate(month, year, day) {
    return {
        type: 'JUMP_DATE',
        month,
        year,
        day,
    }
};

export function selectDay(day) {
    return {
        type: 'SELECT_DAY',
        day: day
    }
};
//Actions only used for small calendar
export function prevSmallMonth() {
    return {
        type: 'PREV_SMALL_MONTH'
    }
};

export function nextSmallMonth() {
    return {
        type: 'NEXT_SMALL_MONTH'
    }
}

export function jumpSmallDate(month, year, day) {
    return {
        type: 'JUMP_SMALL_DATE',
        month,
        year,
        day,
    }
};

export function selectSmallDay(day) {
    return {
        type: 'SELECT_SMALL_DAY',
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

export function removeFollowTasks(task) {
    return {
        type: 'REMOVE_FOLLOW_TASKS',
        task
    }
}

export function removeAllTasks(task) {
    return {
        type: 'REMOVE_ALL_TASKS',
        task
    }
}

export function editCurrentTask(editedTask, oldTask) {
    return {
        type: 'EDIT_CURRENT_TASK',
        editedTask,
        oldTask,
    }
}

export function editFollowTasks(editedTask, oldTask) {
    return {
        type: 'EDIT_FOLLOW_TASKS',
        editedTask,
        oldTask,
    }
}

export function editAllTasks(editedTask, oldTask) {
    return {
        type: 'EDIT_ALL_TASKS',
        editedTask,
        oldTask,
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

//DELETE TASK ACTIONS (used by an async action)
  //Actions used to delete tasks and to know the status of a task when is being saved by the server
export function removeTaskPending(status) {
    return {
        type: 'REMOVE_TASK_PENDING',
        taskStatus: status
    }
}

export function removeTaskSuccess(status) {
    return {
        type: 'REMOVE_TASK_SUCCESS',
        taskStatus: status
    }
}

export function removeTaskFailure(taskList) {
    return {
        type: 'REMOVE_TASK_FAILURE',
        taskStatus: 'FAILURE',
        taskList: taskList
    }
}

export function removeCurrentTaskRequest(task) {
    return async function(dispatch, getState) {
        dispatch(removeTaskPending('PENDING'));

        await dispatch(removeCurrentTask(task));
        const newState = getState().taskList;
        
        apiClient.deleteTask(newState)
            .then((resp) => dispatch(removeTaskSuccess(resp)))
            .catch((resp) => dispatch(removeTaskFailure(resp)))
    }
}

export function removeFollowTasksRequest(task) {
    return async function(dispatch, getState) {
        dispatch(removeTaskPending('PENDING'));

        await dispatch(removeFollowTasks(task));
        const newState = getState().taskList;
        
        apiClient.deleteTask(newState)
            .then((resp) => dispatch(removeTaskSuccess(resp)))
            .catch((resp) => dispatch(removeTaskFailure(resp)))
    }
}

export function removeAllTasksRequest(task) {
    return async function(dispatch, getState) {
        dispatch(removeTaskPending('PENDING'));

        await dispatch(removeAllTasks(task));
        const newState = getState().taskList;
        
        apiClient.deleteTask(newState)
            .then((resp) => dispatch(removeTaskSuccess(resp)))
            .catch((resp) => dispatch(removeTaskFailure(resp)))
    }
}

//EDIT TASK ACTIONS (used by an async action)
  //Actions used to edit tasks and to know the status of a task when is being edited by the server
  export function editTaskPending(status) {
    return {
        type: 'EDIT_TASK_PENDING',
        taskStatus: status
    }
}

export function editTaskSuccess(status) {
    return {
        type: 'EDIT_TASK_SUCCESS',
        taskStatus: status
    }
}

export function editTaskFailure(taskList) {
    return {
        type: 'EDIT_TASK_FAILURE',
        taskStatus: 'FAILURE',
        taskList: taskList
    }
}

export function editCurrentTaskRequest(editedTask, oldTask) {
    return async function(dispatch, getState) {
        dispatch(editTaskPending('PENDING'));

        await dispatch(editCurrentTask(editedTask, oldTask));
        const newTask = getState().taskList;

        apiClient.editTask(newTask)
            .then((resp) => dispatch(editTaskSuccess(resp)))
            .catch((resp) => dispatch(editTaskFailure(resp)))
    }
}

export function editFollowTasksRequest(editedTask, oldTask) {
    return async function(dispatch, getState) {
        dispatch(editTaskPending('PENDING'));

        await dispatch(editFollowTasks(editedTask, oldTask));
        const newTask = getState().taskList;

        apiClient.editTask(newTask)
            .then((resp) => dispatch(editTaskSuccess(resp)))
            .catch((resp) => dispatch(editTaskFailure(resp)))
    }
}

export function editAllTasksRequest(editedTask, oldTask) {
    return async function(dispatch, getState) {
        dispatch(editTaskPending('PENDING'));

        await dispatch(editAllTasks(editedTask, oldTask));
        const newTask = getState().taskList;

        apiClient.editTask(newTask)
            .then((resp) => dispatch(editTaskSuccess(resp)))
            .catch((resp) => dispatch(editTaskFailure(resp)))
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
