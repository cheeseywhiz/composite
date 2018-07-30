import React from 'react';
import {connect, } from 'react-redux';
import actions, {entryOrders, } from '../../common/actions.js';
import selectors from '../common/selectors/selectors.js';
import Selector from '../common/Selector.js';

const mapStateToProps = (state) => ({
    entryOrder: selectors.base.entryOrder(state),
});

const mapDispatchToProps = (dispatch) => ({
    onEntryOrderChange: (entryOrder) => dispatch(actions.updateEntryOrder(entryOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({entryOrder, onEntryOrderChange}) => {
        const orders = Object.values(entryOrders);
        const labels = [
            'Global',
            'Local',
        ];
        return <div>
            <b>Entry order</b><br />
            <Selector
                currentValue={entryOrder}
                values={orders}
                labels={labels}
                onChange={onEntryOrderChange} />
        </div>
    }
);
