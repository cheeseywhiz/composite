import {combineReducers, } from 'redux';
import combineReducersStack from './combineReducersStack.js';
import mergeReducers from './mergeReducers.js';
import * as reducers from './reducers.js';
import * as shapeReducers from './shapeReducers.js';

const shape = combineReducers(shapeReducers);

const {matrix, operation, ...rest} = reducers;
export default mergeReducers(
    combineReducersStack({matrix, operation}),
    combineReducers({...rest, shape}),
);
