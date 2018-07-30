import {createSelector, } from 'reselect';
import Frame from './Frame.js';
import baseSelectors from './baseSelectors.js';

export default {
    number: createSelector(
        baseSelectors.matrix,
        (matrix) => matrix.number
    ),
    frame: createSelector(
        baseSelectors.matrix,
        ({xi, yi, ox, xj, yj, oy}) => new Frame().set(
            xi || 1, yi || 0, 0, ox || 0,
            xj || 0, yj || 1, 0, oy || 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        )
    ),
};
