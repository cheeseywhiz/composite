import zip from '../common/zip.js';

const dictSlice = (dict) => (keys) => {
    const newDict = {};
    keys.forEach((key) => {
        newDict[key] = dict[key];
    });
    return newDict;
};

export default (...reducers) => {
    const defaultStates = reducers
        .map((reducer) => reducer(undefined, {type: undefined}));
    const defaultState = Object.assign({}, ...defaultStates);
    // Track which fields are controlled by each reducer, so that
    // Each reducer operates only on its own slice
    const fields = defaultStates.map(Object.keys);
    return (state = defaultState, action) => {
        const stateSlices = fields.map(dictSlice(state));
        const newStates = zip(stateSlices, reducers)
            .map(([stateSlice, reducer]) => reducer(stateSlice, action));
        if (zip(stateSlices, newStates)
            .every(([stateSlice, newState]) => stateSlice === newState))
            return state;
        return Object.assign({}, ...newStates);
    };
}
