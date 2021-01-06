import dateReducer from './dateReducer';
import taskListReducer from './taskListReducer';

export default function reducer(state={}, action) {
    return {
        date: dateReducer(state.date, action),
        taskList: taskListReducer(state.taskList, action),
        taskStatus: statusReducer(state.taskStatus, action)
    }
};

function statusReducer(
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
        default:{
            return state;
        }
    }
}