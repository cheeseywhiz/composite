import {
    types, defaultMatrix, operationNames, defaultGeometry, entryOrders,
} from '../common/actions.js';

export function matrix(state = defaultMatrix, {type, matrix}) {
    switch (type) {
        case types.SET_MATRIX:
            return {...state, ...matrix};
        case types.UPDATE_OPERATION:
        case types.stack.PUSH:
        case types.RESET_MATRIX:
            return defaultMatrix;
        default:
            return state;
    }
}

export function operation(state = operationNames.DEFAULT, {type, operationName}) {
    switch (type) {
        case types.UPDATE_OPERATION:
            return operationName;
        default:
            return state;
    }
}

export function geometry(state = defaultGeometry, {type, value}) {
    switch (type) {
        case types.TOGGLE_GEOMETRY:
            return {...state, [value]: !state[value]};
        default:
            return state;
    }
}

export function entryOrder(state = entryOrders.GLOBAL, {type, entryOrder}) {
    switch (type) {
        case types.UPDATE_ENTRY_ORDER:
            return entryOrder;
        default:
            return state;
    }
}
