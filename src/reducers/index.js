import dateReducer from './dateReducer';

export default function reducer(state={}, action) {
    return {
        date: dateReducer(state.date, action),
        taskList: 'task',
    }
};