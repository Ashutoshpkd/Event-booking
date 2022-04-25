import { createStore } from 'redux';

const storage = window.sessionStorage;

const INITIAL_STATE = {
    token: storage.getItem('signInToken') || null,
    userId: null,
}

const rootReducer = (state = INITIAL_STATE, action) => {
    if(action.type === 'LOGIN') {
        return {
            ...state,
            token: action.payload.token,
            userId: action.payload.userId,
        }
    }
    if(action.type === 'LOGOUT') {
        return {
            ...state,
            token: null,
            userId: null,
        }
    }
    return state;
}

const store = createStore(rootReducer);

export default store;