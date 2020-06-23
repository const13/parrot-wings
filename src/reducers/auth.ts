import { 
    AuthAction,
    SIGNUP_REQUEST,
    SIGNUP_ERROR, 
    SIGNUP_SUCCESS, 
    SIGNIN_REQUEST, 
    SIGNIN_ERROR, 
    SIGNIN_SUCCESS, 
    LOGOUT_USER,
    USER_INFO_REQUEST,
    USER_INFO_ERROR,
    USER_INFO_SUCCESS
} from "../actions/Auth";

const initialState = {
    currentUser: {},
    pending: false,
    error: null,
    isAuth: false
}

export default function authReducer(state = initialState, action: AuthAction) {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case SIGNIN_REQUEST:
        case USER_INFO_REQUEST:
        case USER_INFO_ERROR:
        case SIGNUP_ERROR:
        case SIGNIN_ERROR:
            return { 
                ...state, 
                pending: action.isLoading, 
                error: action.error 
            }
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            return { 
                ...state,
                token: action.payload, 
                pending: action.isLoading, 
                error: action.error,
                isAuth: action.isAuth
            }
        case LOGOUT_USER:
            return { 
                ...state,
                token: {},
                currentUser: {},
                isAuth: action.isAuth
            }
        case USER_INFO_SUCCESS:
            return { 
                ...state,
                currentUser: action.payload,
                pending: action.isLoading, 
                error: action.error,
                isAuth: action.isAuth
            }
        default:
            return state;
    }
}