import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import SecurityReducer from "../reducers/securityReducer";
import thunk from "redux-thunk";

const makeRootReducer = () => (
    combineReducers({
        security: SecurityReducer,
    })
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(makeRootReducer(), composeEnhancers(applyMiddleware(thunk)));

export default store;
