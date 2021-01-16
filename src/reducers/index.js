import dateReducer from './dateReducer';
import taskListReducer from './taskListReducer';
import statusReducer from './statusReducer';
import fakeTokenReducer from './fakeTokenReducer';
import userReducer from './userReducer';

export default function reducer(state={}, action) {
    return {
        date: dateReducer(state.date, action),
        taskList: taskListReducer(state.taskList, action),
        fakeToken: fakeTokenReducer(state.fakeToken, action),
        user: userReducer(state.user, action),
        appStatus: statusReducer(state.appStatus, action)
    }
};