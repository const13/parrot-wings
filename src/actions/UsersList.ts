import User from '../types/User';
import { USER_LIST_URL } from '../constants/urls';
import { authHeader } from '../helpers/authHeader';

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
export const USER_LIST_ERROR = 'USER_LIST_ERROR';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';

export const CLEAR_USER_LIST = 'CLEAR_USER_LIST';

export type UsersListAction = { 
    type: string,
    payload: any,
    isLoading?: boolean,
    error?: string
};

const requestUsersList = () => ({
    type: USER_LIST_REQUEST,
    isLoading: true,
    error: null,
})

const usersListError = (message = '') => ({
    type: USER_LIST_ERROR,
    payload: [],
    isLoading: false,
    error: message
})

const usersListSuccess = (usersList: User[]) => ({
    type: USER_LIST_SUCCESS,
    payload: usersList,
    isLoading: false,
    error: null
})

export const clearUsersList = () => ({
    type: CLEAR_USER_LIST,
    payload: [],
    isLoading: false,
    error: null
})

const paramsUsersList = (filter: string) => {
    if (filter === '') filter = ' ';
    let params: RequestInit = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type':'application/json',
            ...authHeader()
        },
        body: JSON.stringify({filter: filter})  
    }
    return params;
};

export function getUsersList(filter: string = ' ') {
    return async (dispatch: any) => {
        dispatch(requestUsersList())
    
        try {
            const response = await fetch(USER_LIST_URL, paramsUsersList(filter));
            const body = await response.text();

            if (response.ok) {
                let usersList = JSON.parse(body);
                dispatch(usersListSuccess(usersList));
            } else {
                dispatch(usersListError(body));
            }
        }
        catch (err) {
            dispatch(usersListError())
            console.log('error: ', err);
        }
    }
}