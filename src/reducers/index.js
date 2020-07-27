import dateReducer from './dateReducer';
import taskListReducer from './taskListReducer';

export default function reducer(state={}, action) {
    return {
        date: dateReducer(state.date, action),
        taskList: taskListReducer(state.taskList, action),
    }
};