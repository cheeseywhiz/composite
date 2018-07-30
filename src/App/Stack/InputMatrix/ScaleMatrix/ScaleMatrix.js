import React from 'react';
import MatrixInput from '../common/MatrixInput.js';
import InputMatrixBase from '../common/InputMatrixBase/InputMatrixBase.js';
import ScaleInput from './ScaleInput.js';

export default () => {
    const matrix = {
        xi: <MatrixInput matrixKey='xi' />,
        yj: <MatrixInput matrixKey='yj' />,
    };
    return <InputMatrixBase
        matrix={matrix}
        input={<ScaleInput autofocus />} />
};
