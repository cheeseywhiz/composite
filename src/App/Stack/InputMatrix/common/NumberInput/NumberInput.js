import React from 'react';
import PropTypes from 'prop-types';
import {connect, } from 'react-redux';
import actions from '../../../../../common/actions.js';
import selectors from '../../../../common/selectors/selectors.js';
import roundFloatStr from '../../../common/roundFloatStr.js';
import style from './NumberInput.css';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    onEnter: () => dispatch(actions.stack.push()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onKeyPress({key}) {
        switch (key) {
            case "Enter":
                this.props.onEnter();
                break;
        }
    }

    onChange({target}) {
        this.props.onNumberChange(parseFloat(target.value));
    }

    componentDidMount() {
        if (this.props.autofocus) {
            this.input.current.focus();
            this.input.current.select();
        }
    }

    render() {
        const {value, autofocus, onNumberChange, onEnter, ...props} = this.props;
        return <input
            {...props}
            ref={this.input}
            className={style.numberInput}
            type='number'
            value={Number.isFinite(value) ? roundFloatStr(value) : ''}
            onKeyPress={this.onKeyPress}
            onChange={this.onChange} />
    }
}

NumberInput.propTypes = {onNumberChange: PropTypes.func.isRequired};
