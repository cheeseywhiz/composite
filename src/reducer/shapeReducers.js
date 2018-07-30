import {types, shapeNames, defaultShapeFile, } from '../common/actions.js';

export const selection = (state = shapeNames.NONE, {type, selection}) => {
    switch (type) {
        case types.shape.UPDATE_SELECTION:
            return selection;
        default:
            return state;
    }
};

export const file = (state = defaultShapeFile, {type, fname, data}) => {
    switch (type) {
        case types.shape.UPDATE_FILE:
            return {fname, data};
        default:
            return state;
    }
}
