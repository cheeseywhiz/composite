import {createSelector, } from 'reselect';
import Frame, {identityFrame, } from './Frame.js';

const selectMatrix = (state) => state.matrix;
const selectNumber = (state) => selectMatrix(state).number;
const selectOperation = (state) => state.operation;
const selectGeometry = (state) => state.geometry;
const selectShape = (state) => state.shape;

const selectFrame = createSelector(
    selectMatrix,
    ({xi, yi, ox, xj, yj, oy}) => new Frame().set(
        xi || 1, yi || 0, 0, ox || 0,
        xj || 0, yj || 1, 0, oy || 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    )
);
// Only the stack field
const selectShortStack = createSelector(
    (state) => state.stack,
    (stack) => (
        stack.filter((state) => (
            !selectFrame(state).isIdentity()
        ))
    ),
);
// The stack and the input matrix
const selectFullStack = createSelector(
    selectShortStack, selectMatrix, selectOperation, selectFrame,
    (shortStack, matrix, operation, frame) => {
        const fullStack = [...shortStack];
        if (!frame.isIdentity()) {
            fullStack.push({matrix, operation, stack: shortStack});
        }
        return fullStack;
    },
);
const selectGlobals = createSelector(
    selectFullStack,
    (fullStack) => {
        const reducer = (globals, currentValue) => {
            const newLength = globals.push(currentValue.clone());
            globals[newLength - 1].multiply(globals[newLength - 2]);
            return globals;
        };

        return fullStack
            .map(selectFrame)
            .reduce(reducer, [identityFrame]);
    },
);
const selectLocals = createSelector(
    selectFullStack,
    (fullStack) => {
        const reducer = (locals, currentValue) => {
            const newLength = locals.push(identityFrame.clone());
            locals[newLength - 1].multiplyMatrices(locals[newLength - 2], currentValue);
            return locals;
        }

        return fullStack
            .map(selectFrame)
            .reverse()
            .reduce(reducer, [identityFrame]);
    },
);

const selectors = {
    matrix: selectMatrix,
    number: selectNumber,
    operation: selectOperation,
    geometry: selectGeometry,
    shape: selectShape,
    frame: selectFrame,
    shortStack: selectShortStack,
    fullStack: selectFullStack,
    globals: selectGlobals,
    locals: selectLocals,
};
export default selectors;

export function selectAll(state) {
    const derived = {};
    Object.entries(selectors).forEach(([name, selector]) => {
        derived[name] = selector(state);
    });
    return derived;
}