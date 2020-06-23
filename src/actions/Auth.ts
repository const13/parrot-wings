import User from '../types/User';
import { authHeader } from '../helpers/authHeader';
import { SIGNUP_URL, SIGNIN_URL, USER_INFO_URL } from '../constants/urls';
import { clearTransactionsList } from './Transations';
import { clearUsersList } from './UsersList';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'

export const LOGOUT_USER = 'LOGOUT_USER';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_ERROR = 'USER_INFO_ERROR';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';


export type AuthAction = { 
    type: string,
    payload: any,
    isLoading?: boolean,
    error?: string,
    isAuth?: boolean
};

const requestSignUp = (user: User) => ({
    type: SIGNUP_REQUEST,
    isLoading: true,
    error: null,
})

const signUpError = (message = '') => ({
    type: SIGNUP_ERROR,
    payload: {},
    isLoading: false,
    error: message
})

const signUpSuccess = (user: User) => ({
    type: SIGNUP_SUCCESS,
    payload: user,
    isLoading: false,
    error: null,
    isAuth: true
})

const paramsSignUp = (credentials: User) => {
    let params: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },        
        body: JSON.stringify(credentials)
    }
    return params;
};

export function signUpUser(credentials: User) {
    return async (dispatch: any) => {
        dispatch(requestSignUp(credentials))
    
        try {
            const response = await fetch(SIGNUP_URL, paramsSignUp(credentials));
            const body = await response.text();

            if (response.ok) {
                let token = JSON.parse(body);
                dispatch(signUpSuccess({...token}));
                localStorage.setItem('id_token', token.id_token);
            } else {
                dispatch(signUpError(body));
            }
        }
        catch (err) {
            dispatch(signUpError())
            console.log('error: ', err);
        }
    }
}

export const requestSignIn = (user: User) => ({
    type: SIGNIN_REQUEST,
    isLoading: true,
    error: null,
})

export const signInError = (message = '') => ({
    type: SIGNIN_ERROR,
    isLoading: false,
    error: message
})

export const signInSuccess = (user: User) => ({
    type: SIGNIN_SUCCESS,
    payload: user,
    isLoading: false,
    error: null,
    isAuth: true,
})

export function signInUser(credentials: User) {
    return async (dispatch: any) => {
        dispatch(requestSignIn(credentials))
    
        try {
            const response = await fetch(SIGNIN_URL, paramsSignUp(credentials));
            const body = await response.text();

            if (response.ok) {
                let token = JSON.parse(body);
                dispatch(signInSuccess({...token}));
                localStorage.setItem('id_token', token.id_token);
            } else {
                dispatch(signInError(body));
            }
        }
        catch (err) {
            dispatch(signInError());
            console.log('error: ', err);
        }
    }
}

const logoutUserAction = () => ({
    type: LOGOUT_USER,
    isAuth: false
})

export function logoutUser() {
    return async (dispatch: any) => {
        localStorage.removeItem('id_token');
        dispatch(clearTransactionsList());
        dispatch(clearUsersList());
        dispatch(logoutUserAction());
    } 
}

export const requestUserInfo = () => ({
    type: USER_INFO_REQUEST,
    isLoading: true,
})

export const userInfoError = (message = '') => ({
    type: USER_INFO_ERROR,
    payload: {},
    isLoading: false,
    error: message
})

export const userInfoSuccess = (user: User) => ({
    type: USER_INFO_SUCCESS,
    payload: user,
    isLoading: false,
    error: null,
    isAuth: true
})

const paramsUserInfo = () => {
    let params: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            ...authHeader()
        }, 
    }
    return params;
};

export function getUserInfo() {
    return async (dispatch: any) => {
        dispatch(requestUserInfo())
    
        try {
            const response = await fetch(USER_INFO_URL, paramsUserInfo());
            const body = await response.text();

            if (response.ok) {
                let user = JSON.parse(body);
                dispatch(userInfoSuccess(user.user_info_token));
            } else {
                dispatch(userInfoError(body));
            }
        }
        catch (err) {
            dispatch(userInfoError())
            console.log('error: ', err);
        }
    }
}