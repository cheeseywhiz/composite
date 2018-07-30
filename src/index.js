import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, } from 'react-redux';
import {createStore, combineReducers, } from 'redux';
import reducer from './reducer/reducer.js';
import {logIntermediates, } from './App/common/selectors/selectors.js';
import App from './App/App.js';

function main() {
    const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    store.subscribe(logIntermediates(store));
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app-container')
    );
}

main();
