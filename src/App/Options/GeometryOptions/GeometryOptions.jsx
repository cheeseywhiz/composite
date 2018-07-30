import React from 'react';
import {connect, } from 'react-redux';
import actions from '../../../common/actions.js';
import selectors from '../../common/selectors/selectors.js';
import style from './GeometryOptions.css';

const mapStateToProps = (state) => ({
    geometry: selectors.base.geometry(state),
});

const mapDispatchToProps = (dispatch) => ({
    onGeometryChange: (value) => dispatch(actions.toggleGeometry(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ({geometry, onGeometryChange}) => {
        const labels = {
            globals: 'Global intermediate frames',
            locals: 'Local intermediate frames',
            frames: 'Coordinate frames',
            intermediateHelpers: 'Intermediate transformation visualization',
        };
        return <div>
            <b>Geometry options</b>
            {Object.entries(labels)
                .map(([name, label]) => [name, label, () => onGeometryChange(name)])
                .map(([name, label, onClick]) => <div key={name} className={style.option}>
                    <input
                        type='checkbox'
                        value={name}
                        checked={geometry[name]}
                        onChange={onClick} />
                    <div onClick={onClick} className={style.label}>
                        {label}
                    </div>
                </div>)}
        </div>
    }
);
