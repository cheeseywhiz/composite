import React from 'react';
import MatrixInput from '../common/MatrixInput.js';
import InputMatrixBase from '../common/InputMatrixBase/InputMatrixBase.js';
import RotationInput from './RotationInput.js';

export default () => {
    const matrix = {
        xi: <MatrixInput matrixKey='xi' disabled />,
        yi: <MatrixInput matrixKey='yi' disabled />,
        xj: <MatrixInput matrixKey='xj' disabled />,
        yj: <MatrixInput matrixKey='yj' disabled />,
    };
    return <InputMatrixBase
        matrix={matrix}
        input={<RotationInput autofocus />} />
};
