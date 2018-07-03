import React from 'react';
import {connect, } from 'react-redux';
import actions from '../../common/actions.js';
import selectors from '../common/selectors/selectors.js';
import FrameList from './FrameList/FrameList.js';
import InputMatrix from './InputMatrix/InputMatrix.js';

const mapStateToProps = (state) => ({
    shortStack: selectors.shortStack(state),
});

const mapDispatchToProps = (dispatch) => ({
    onPush: () => dispatch(actions.stack.push()),
    onPop: () => dispatch(actions.stack.pop()),
    onClear: () => dispatch(actions.stack.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({shortStack, onPush, onPop, onClear}) => {
        return <div>
            <b>Operation stack</b><br />
            <input type='button' value='Push' onClick={onPush} />
            <input type='button' value='Pop' onClick={onPop} />
            <input type='button' value='Clear' onClick={onClear} />
            <FrameList frames={shortStack.map(selectors.frame)}>
                <InputMatrix />
            </FrameList>
        </div>
    }
);
