import {createSelector, } from 'reselect';
import {shapeNames, } from '../../../../common/actions.js';
import zip from '../../../../common/zip.js';
import shapes from './shapes.js';

const selectShape = (state) => state.shape;

const selectSelection = createSelector(
    selectShape,
    (shape) => shape.selection
);

const selectFile = createSelector(
    selectShape,
    (shape) => shape.file
);

const selectFname = createSelector(
    selectFile,
    (file) => file.fname
);

const selectData = createSelector(
    selectFile,
    (file) => file.data
);

const selectFunc = createSelector(
    selectSelection,
    (selection) => {
        const names = Object.values(shapeNames);
        const shapeFuncs = Object.values(shapes);
        const map = {};
        zip(names, shapeFuncs).forEach(([name, value]) => {
            map[name] = value;
        });
        return map[selection];
    }
);

const selectGeometry = createSelector(
    selectFunc, selectData,
    (func, data) => (
        func ? func(data) : null
    )
);

export default {
    selection: selectSelection,
    file: selectFile,
    fname: selectFname,
    data: selectData,
    func: selectFunc,
    geometry: selectGeometry,
};
