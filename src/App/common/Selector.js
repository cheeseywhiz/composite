import React from 'react';
import zip from '../../common/zip.js';

export default ({currentValue, values, labels, onChange, disableFirst}) => (
    <select value={currentValue} onChange={(event) => onChange(event.target.value)}>
        {zip(values, labels).map(([value, label], index) => (
            <option
                key={value}
                value={value}
                disabled={disableFirst && index === 0}>
                {label}
            </option>
        ))}
    </select>
);
