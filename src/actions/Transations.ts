import Transaction from '../types/Transaction';
import { TRANSACTIONS_URL } from '../constants/urls';
import { authHeader } from '../helpers/authHeader';
import { getUserInfo } from './Auth';

export const TRANSACTIONS_LIST_REQUEST = 'TRANSACTIONS_LIST_REQUEST';
export const TRANSACTIONS_LIST_ERROR = 'TRANSACTIONS_LIST_ERROR';
export const TRANSACTIONS_LIST_SUCCESS = 'TRANSACTIONS_LIST_SUCCESS';

export const CREATE_TRANSACTIONS_REQUEST = 'CREATE_TRANSACTIONS_REQUEST';
export const CREATE_TRANSACTIONS_ERROR = 'CREATE_TRANSACTIONS_ERROR';
export const CREATE_TRANSACTIONS_SUCCESS = 'CREATE_TRANSACTIONS_SUCCESS';

export const CLEAR_TRANSACTIONS_LIST = 'CLEAR_TRANSACTIONS_LIST';

export const COPY_TRANSACTION = 'COPY_TRANSACTION';

export type UsersListAction = { 
    type: string,
    payload: any,
    isLoading?: boolean,
    error?: string
};

const requestTransactionsList = () => ({
    type: TRANSACTIONS_LIST_REQUEST,
    isLoading: true,
})

const transactionsListError = (message = '') => ({
    type: TRANSACTIONS_LIST_ERROR,
    payload: [],
    isLoading: false,
    error: message
})

const transactionsListSuccess = (response: Transaction[]) => ({
    type: TRANSACTIONS_LIST_SUCCESS,
    payload: response,
    isLoading: false,
    error: null
})

const paramsTransactionsList = () => {
    let params: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            ...authHeader()
        },
    }
    return params;
};

export function getTransactionsList() {
    return async (dispatch: any) => {
        dispatch(requestTransactionsList())
    
        try {
            const response = await fetch(TRANSACTIONS_URL, paramsTransactionsList());
            const body = await response.text();

            if (response.ok) {
                let transactionsList = JSON.parse(body);
                dispatch(transactionsListSuccess(transactionsList.trans_token));
            } else {
                dispatch(transactionsListError(body));
            }
        }
        catch (err) {
            dispatch(transactionsListError())
            console.log('error: ', err);
        }
    }
}

const requestCreateTransaction = () => ({
    type: CREATE_TRANSACTIONS_REQUEST,
    isLoading: true,
})

const transactionCreateError = (message = '') => ({
    type: CREATE_TRANSACTIONS_ERROR,
    payload: [],
    isLoading: false,
    error: message
})

const transactionCreateSuccess = (response: Transaction) => ({
    type: CREATE_TRANSACTIONS_SUCCESS,
    payload: response,
    isLoading: false,
    error: null
})

const paramsCreacteTransaction = (trans: {name: string, amount: number}) => {
    let params: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            ...authHeader()
        },
        body: JSON.stringify(trans)
    }
    return params;
};

export function createTransaction(trans: {name: string, amount: number}) {
    return async (dispatch: any) => {
        dispatch(requestCreateTransaction())
    
        try {
            const response = await fetch(TRANSACTIONS_URL, paramsCreacteTransaction(trans));
            const body = await response.text();

            if (response.ok) {
                let transaction = JSON.parse(body);
                dispatch(transactionCreateSuccess(transaction.trans_token));
                dispatch(getTransactionsList());
                dispatch(getUserInfo());
            } else {
                dispatch(transactionCreateError(body));
            }
        }
        catch (err) {
            dispatch(transactionCreateError())
            console.log('error: ', err);
        }
    }
}

export const clearTransactionsList = () => ({
    type: CLEAR_TRANSACTIONS_LIST,
    isLoading: false,
    error: null
})

export const copyTransaction = (transaction: Transaction) => ({
    type: COPY_TRANSACTION,
    payload: transaction
})