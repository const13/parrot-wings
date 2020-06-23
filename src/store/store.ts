import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from "../reducers/index";

// const store = createStore(appStore);

// export default store;

const loggerMiddleware = createLogger();

function configureStore(preloadedState?: any) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}

const store = configureStore();

export default store;