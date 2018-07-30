import React from 'react';
import MatrixInput from './common/MatrixInput.js';
import InputMatrixBase from './common/InputMatrixBase/InputMatrixBase.js';

export default () => {
    const matrix = {
            xi: <MatrixInput matrixKey='xi' autofocus />,
            yi: <MatrixInput matrixKey='yi' />,
            ox: <MatrixInput matrixKey='ox' />,
            xj: <MatrixInput matrixKey='xj' />,
            yj: <MatrixInput matrixKey='yj' />,
            oy: <MatrixInput matrixKey='oy' />,
    };
    return <InputMatrixBase matrix={matrix} />
};
