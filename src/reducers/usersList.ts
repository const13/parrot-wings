import { 
    UsersListAction,
    USER_LIST_REQUEST,
    USER_LIST_ERROR,
    USER_LIST_SUCCESS,
    CLEAR_USER_LIST
} from "../actions/UsersList";

const initialState = {
    usersList: [],
    pending: false,
    error: null,
}

export default function usersListReducer(state = initialState, action: UsersListAction) {
    switch (action.type) {
        case USER_LIST_REQUEST:
        case USER_LIST_ERROR:
            return { ...state, pending: action.isLoading, error: action.error }
        case USER_LIST_SUCCESS:
        case CLEAR_USER_LIST:
            return { ...state, usersList: action.payload, pending: action.isLoading, error: action.error }
        default:
            return state;
    }
}