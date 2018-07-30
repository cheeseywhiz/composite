import {combineReducers, } from 'redux';
import {types, } from '../common/actions.js';

const defaultStack = [];

const stack = (state = defaultStack, {type}) => {
    switch (type) {
        case types.stack.CLEAR:
            return defaultStack;
        default:
            return state;
    }
};

// not a typical reducer
// computes any fields that need updating given the entire state
const updateStack = (state, {type}) => {
    switch (type) {
        case types.stack.PUSH: {
            const {stack, ...entry} = state;
            return {stack: [...stack, entry]};
        };
        case types.stack.POP: {
            const stack = [...state.stack];
            const entry = stack.pop();
            return entry === undefined ? state : {stack, ...entry};
        };
        default:
            return state;
    }
}

export default (fields) => {
    const reducer = combineReducers({...fields, stack});
    return (state, action) => {
        let newState = reducer(state, action);
        const stackUpdate = updateStack(state, action);
        if (stackUpdate === state) return newState;
        if (newState === state) newState = {...state};
        return Object.assign(newState, stackUpdate);
    };
};
