import { combineReducers } from 'redux';
import authReducer from './auth';
import usersListReducer from './usersList';
import transactionsReducer from './transactions';

const rootReducer = combineReducers({
    auth: authReducer,
    usersList: usersListReducer,
    transactions: transactionsReducer
})
  
export default rootReducer;