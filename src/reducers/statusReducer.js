export default function statusReducer(
    state={
        loadTasks: null,
        saveTask: null
    }, action) {
    switch(action.type) {
        case 'FETCH_TASK_PENDING': {
            return {
                ...state,
                loadTasks: action.taskStatus
            };
        }
        case 'FETCH_TASK_SUCCESS': {
            return {
                ...state,
                loadTasks: action.taskStatus
            };
        }
        case 'FETCH_TASK_FAILURE': {
            return {
                ...state,
                loadTasks: action.taskStatus
            };
        }
        case 'SAVE_TASK_PENDING': {
            return {
                ...state,
                saveTask: action.taskStatus
            }
        }
        case 'SAVE_TASK_SUCCESS': {
            return {
                ...state,
                saveTask: action.taskStatus
            }
        }
        case 'SAVE_TASK_FAILURE': {
            return {
                ...state,
                saveTask: action.taskStatus
            }
        }
        case 'CLOSE_TASK_WARNING': {
            const newState = Object.assign({}, state);
            newState[action.warningType] = action.taskStatus;
            return newState;
        }
        default:{
            return state;
        }
    }
}