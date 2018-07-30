import React from 'react';
import Matrix from '../../../common/Matrix/Matrix.jsx';
import OperationSelector from './OperationSelector.jsx';
import ResetButton from './ResetButton.jsx';
import style from './InputMatrixBase.css';

export default ({matrix, input}) => <div className={style.inputMatrix}>
    <div className={style.topRow}>
        <div className={style.selector}>
            <OperationSelector />
        </div>
        <ResetButton />
    </div>
    {input &&
        <div className={style.input}>
            {input}
        </div>
    }
    <Matrix matrix={matrix} />
</div>
