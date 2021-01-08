import dateReducer from './dateReducer';
import taskListReducer from './taskListReducer';
import statusReducer from './statusReducer';

export default function reducer(state={}, action) {
    return {
        date: dateReducer(state.date, action),
        taskList: taskListReducer(state.taskList, action),
        taskStatus: statusReducer(state.taskStatus, action)
    }
};