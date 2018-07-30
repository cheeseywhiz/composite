import React from 'react';
import {connect, } from 'react-redux';
import {operationNames, } from '../../../common/actions.js';
import zip from '../../../common/zip.js';
import selectors from '../../common/selectors/selectors.js';
import InputMatrixBase from './common/InputMatrixBase/InputMatrixBase.js';
import RotationMatrix from './RotationMatrix/RotationMatrix.js';
import ScaleMatrix from './ScaleMatrix/ScaleMatrix.js';
import TranslationMatrix from './TranslationMatrix.js';
import ManualMatrix from './ManualMatrix.js';

const mapStateToProps = (state) => ({
    operation: selectors.base.operation(state),
});

export default connect(mapStateToProps)(
    ({operation}) => {
        const names = Object.values(operationNames);
        const types = [
            InputMatrixBase,
            RotationMatrix,
            ScaleMatrix,
            TranslationMatrix,
            ManualMatrix,
        ];
        const map = {};
        zip(names, types).forEach(([name, type]) => {
            map[name] = type;
        });
        const InputMatrix = map[operation];
        return <InputMatrix />
    }
);
