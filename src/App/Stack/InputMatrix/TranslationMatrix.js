import React from 'react';
import MatrixInput from './common/MatrixInput.js';
import InputMatrixBase from './common/InputMatrixBase/InputMatrixBase.js';

export default () => {
    const matrix = {
        ox: <MatrixInput matrixKey='ox' autofocus />,
        oy: <MatrixInput matrixKey='oy' />,
    };
    return <InputMatrixBase matrix={matrix} />
};
