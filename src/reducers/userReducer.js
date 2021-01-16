export default function userReducer(state=null, action) {
    switch(action.type) {
        case 'FETCH_TOKEN_SUCCESS': {
            const newState = action.user;
            return newState;
        }
        case 'SET_TOKEN_SUCCESS': {
            const newState = action.user;
            return newState;
        }
        case 'REMOVE_TOKEN': {
            const newState = action.user;
            return newState;
        }
        default: {
            return state;
        }
    }
}