import React from 'react';
import roundFloatStr from '../common/roundFloatStr.js';
import Matrix from '../common/Matrix/Matrix.js';

export default function Frame({frame}) {
    const elements = frame.elements.map(roundFloatStr);
    const matrix = {
        xi: elements[0], yi: elements[4], ox: elements[12],
        xj: elements[1], yj: elements[5], oy: elements[13],
    };
    return <Matrix matrix={matrix} />
}
