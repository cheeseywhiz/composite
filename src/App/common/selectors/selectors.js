import {createSelector, } from 'reselect';
import baseSelectors from './common/baseSelectors.js';
import stackSelectors from './common/stackSelectors.js';
import shapeSelectors from './common/shapeSelectors/shapeSelectors.js';
import matrixSelectors from './common/matrixSelectors.js';
import selectGraphObjects from './selectGraphObjects.js';

export default {
    matrix: matrixSelectors,
    stack: stackSelectors,
    shape: shapeSelectors,
    base: baseSelectors,
    graphObjects: selectGraphObjects,
};

export function logIntermediates(store) {
    const getIntermediates = createSelector(
        baseSelectors.geometry, stackSelectors.globals,
        stackSelectors.locals,
        (geometry, globals, locals) => {
            const ret = {};
            if (geometry.globals) ret.globals = globals;
            if (geometry.locals) ret.locals = locals;
            return ret;
        }
    );
    return () => {
        Object.entries(getIntermediates(store.getState()))
            .forEach(([name, intermediates]) => {
                console.log(name);
                console.table(intermediates.map((frame) => frame.elements));
            });
    };
}
