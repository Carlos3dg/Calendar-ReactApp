export default function statusReducer(
    state={
        loadTasks: null,
        saveTask: null,
        loadToken: null,
        setToken: null,
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
        case 'FETCH_TOKEN_PENDING': {
            return {
                ...state,
                loadToken: action.tokenStatus
            }
        }
        case 'FETCH_TOKEN_FAILURE': {
            return {
                ...state,
                loadToken: action.tokenStatus
            }
        }
        case 'FETCH_TOKEN_SUCCESS': {
            return {
                ...state,
                loadToken: action.tokenStatus
            }
        }
        case 'SET_TOKEN_PENDING': {
            return {
                ...state,
                setToken: action.tokenStatus
            }
        }
        case 'SET_TOKEN_FAILURE': {
            return {
                ...state,
                setToken: action.tokenStatus
            }
        }
        case 'SET_TOKEN_SUCCESS': {
            return {
                ...state,
                setToken: action.tokenStatus
            }
        }
        default:{
            return state;
        }
    }
}