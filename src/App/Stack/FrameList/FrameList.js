import React from 'react';
import PropTypes from 'prop-types';
import Frame from './Frame.js';
import style from './FrameList.css';

export default function FrameList({frames, children}) {
    const elements = frames.map((frame, index) => <Frame key={index} frame={frame} />)
    if (children) elements.push(children);
    return <div className={style.frameList}>
        {elements.map((element, index) => <div key={index} className={style.frameItem}>{element}</div>)}
    </div>
}

FrameList.propTypes = {frames: PropTypes.array.isRequired};
