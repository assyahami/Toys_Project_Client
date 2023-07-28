import React from 'react';
import { LOGIN } from './actions';


const initialState = {
    isLoggedIn: false,
    authToken: null,
    user: null
}
export const addPlace = placeName => {
    return {
        type: 'LOGIN',
        payload: placeName
    }
}

const authReduceer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                authToken: action.payload.authToken,
                user: action.payload.user
            }
            break;
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                authToken: null
            }
            break;

        default:
            return state
            break;
    }
}

export default authReduceer