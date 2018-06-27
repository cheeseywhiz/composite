import React from 'react';
import {connect, } from 'react-redux';
import actions from '../../common/actions.js';
import selectors from '../common/selectors.js';

const mapStateToProps = (state) => ({
    geometry: selectors.geometry(state),
});

const mapDispatchToProps = (dispatch) => ({
    onGeometryChange: (value) => dispatch(actions.toggleGeometry(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({geometry, onGeometryChange}) => {
        const onChange = (event) => onGeometryChange(event.target.value);
        const labels = {
            globals: 'Globals',
            locals: 'Locals',
            frames: 'Coordinate frames',
            intermediateHelpers: 'Intermediate helpers',
        };
        return <div>
            <b>Geometry options</b>
            {Object.entries(labels).map(([name, label]) => <div key={name}>
                <input
                    type='checkbox'
                    value={name}
                    checked={geometry[name]}
                    onChange={onChange} />
                {label}
            </div>)}
        </div>
    }
);
