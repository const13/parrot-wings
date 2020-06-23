import { 
    UsersListAction,
    TRANSACTIONS_LIST_REQUEST,
    TRANSACTIONS_LIST_ERROR,
    TRANSACTIONS_LIST_SUCCESS,
    CREATE_TRANSACTIONS_REQUEST,
    CREATE_TRANSACTIONS_ERROR,
    CREATE_TRANSACTIONS_SUCCESS,
    CLEAR_TRANSACTIONS_LIST,
    COPY_TRANSACTION
} from "../actions/Transations";

const initialState = {
    transactionsList: [],
    pending: false,
    error: null,
    copiedTransaction: {}
}

export default function transactionsReducer(state = initialState, action: UsersListAction) {
    switch (action.type) {
        case TRANSACTIONS_LIST_REQUEST:
        case CREATE_TRANSACTIONS_REQUEST:
            return { ...state, pending: action.isLoading } 
        case TRANSACTIONS_LIST_ERROR:
        case CREATE_TRANSACTIONS_ERROR:
            return { ...state, pending: action.isLoading, error: action.error }
        case TRANSACTIONS_LIST_SUCCESS:
            return { 
                ...state, 
                transactionsList: action.payload, 
                pending: action.isLoading, 
                error: action.error 
            }
        case CREATE_TRANSACTIONS_SUCCESS:
            return { 
                ...state, 
                lastTransaction: action.payload, 
                pending: action.isLoading, 
                error: action.error 
            }
        case CLEAR_TRANSACTIONS_LIST:
            return { 
                ...state, 
                lastTransaction: {}, 
                pending: action.isLoading, 
                error: action.error,
                transactionsList: [],
                copiedTransaction: {},
            }
        case COPY_TRANSACTION:
            return { 
                ...state, 
                copiedTransaction: action.payload
            }
        default:
            return state;
    }
}