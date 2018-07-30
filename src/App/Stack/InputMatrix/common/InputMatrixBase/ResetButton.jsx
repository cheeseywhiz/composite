import React from 'react';
import {connect, } from 'react-redux';
import actions from '../../../../../common/actions.js';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(actions.resetMatrix()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({onClick}) => (
        <input type='button' value='Reset' onClick={onClick} />
    )
);
