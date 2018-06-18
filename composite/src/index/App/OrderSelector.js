import React from 'react';
import {connect, } from 'react-redux';
import actions, {operationOrders, } from '../../actions.js';
import selectors from '../../selectors.js';

function mapStateToProps(state) {
    return {
        value: selectors.order(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onOrderChange: (order) => dispatch(actions.updateOrder(order)),
    };
}

const OrderSelector = connect(mapStateToProps, mapDispatchToProps)(
    ({value, onOrderChange}) => (
        <div>
            <b>Operation order</b><br />
            <select value={value} onChange={(event) => onOrderChange(event.target.value)}>
                <option value={operationOrders.GLOBAL_ORDER}>Global</option>
                <option value={operationOrders.LOCAL_ORDER}>Local</option>
            </select>
        </div>
    )
);

export default OrderSelector;
