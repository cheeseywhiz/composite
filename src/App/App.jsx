import React from 'react';
import Options from './Options/Options.jsx';
import Stack from './Stack/Stack.jsx';
import Graph from './Graph/Graph.js';
import style from './App.css';

export default () => <div className={style.app}>
    <div className={style.top}>
        <Stack />
    </div>
    <div className={style.middle}>
        <div className={style.options}>
            <Options />
        </div>
        <div className={style.graph}>
            <Graph />
        </div>
    </div>
</div>
