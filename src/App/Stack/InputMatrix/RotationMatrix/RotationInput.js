import {connect, } from 'react-redux';
import actions from '../../../../common/actions.js';
import selectors from '../../../common/selectors/selectors.js';
import NumberInput from '../common/NumberInput/NumberInput.js';

const mapStateToProps = (state) => ({
    value: selectors.matrix.number(state),
    placeholder: 'angle',
});

const mapDispatchToProps = (dispatch) => ({
    onNumberChange: (angle_degrees) => dispatch(actions.setRotationMatrix(angle_degrees)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberInput);
