import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";
const rootReducer=combineReducers({
users:userReducer,
    articles:articleReducer,
    auth:authReducer
})

export const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))