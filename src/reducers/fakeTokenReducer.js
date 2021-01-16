export default function fakeTokenReducer(state=null, action) {
    switch(action.type) {
        case 'FETCH_TOKEN_SUCCESS': {
            const newState = action.token;
            return newState;
        }
        case 'SET_TOKEN_SUCCESS': {
            const newState = action.token;
            return newState;
        }
        case 'REMOVE_TOKEN': {
            const newState = action.token;
            return newState;
        }
        default: {
            return state;
        }
    }
}