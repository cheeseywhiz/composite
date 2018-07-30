import {connect, } from 'react-redux';
import actions from '../../../../common/actions.js';
import selectors from '../../../common/selectors/selectors.js';
import NumberInput from '../common/NumberInput/NumberInput.js';

const mapStateToProps = (state) => ({
    value: selectors.matrix.number(state),
    placeholder: 'ratio',
});

const mapDispatchToProps = (dispatch) => ({
    onNumberChange: (ratio) => dispatch(actions.setScaleMatrix(ratio)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberInput);
