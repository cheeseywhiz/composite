import {createSelector, } from 'reselect';
import {defaultMatrix, entryOrders, } from '../../../../common/actions.js';
import {identityFrame, } from './Frame.js';
import baseSelectors from './baseSelectors.js';
import matrixSelectors from './matrixSelectors.js';

// Only the stack field
const selectStack = createSelector(
    baseSelectors.stack,
    (stack) => stack.filter((state) => (
        baseSelectors.matrix(state) !== defaultMatrix
    ))
);

// The stack and the input matrix
const selectFull = createSelector(
    selectStack, baseSelectors.matrix, baseSelectors.operation,
    baseSelectors.entryOrder,
    (stack, matrix, operation, entryOrder) => {
        const full = [...stack];
        const newEntry = {matrix, operation};
        if (matrix !== defaultMatrix) full.push(newEntry);
        if (entryOrder === entryOrders.LOCAL) full.reverse();
        return full;
    }
);

const selectGlobals = createSelector(
    selectFull,
    (full) => {
        const reducer = (globals, currentValue) => {
            const newLength = globals.push(currentValue.clone());
            globals[newLength - 1].multiply(globals[newLength - 2]);
            return globals;
        };
        return full
            .map(matrixSelectors.frame)
            .reduce(reducer, [identityFrame]);
    }
);

const selectLocals = createSelector(
    selectFull,
    (full) => {
        const reducer = (locals, currentValue) => {
            const newLength = locals.push(identityFrame.clone());
            locals[newLength - 1].multiplyMatrices(locals[newLength - 2], currentValue);
            return locals;
        };
        return full
            .map(matrixSelectors.frame)
            .reduceRight(reducer, [identityFrame]);
    }
);

export default {
    stack: selectStack,
    full: selectFull,
    globals: selectGlobals,
    locals: selectLocals,
};
