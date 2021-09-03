import { createStore,applyMiddleware,combineReducers } from 'redux';
import { weddingReducer } from './reducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const reducers = {form: formReducer, wedding:weddingReducer};

export const store = createStore(combineReducers(reducers),
    applyMiddleware(thunk));