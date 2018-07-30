export const types = {
    SET_MATRIX: 'SET_MATRIX',
    RESET_MATRIX: 'RESET_MATRIX',
    UPDATE_OPERATION: 'UPDATE_OPERATION',
    TOGGLE_GEOMETRY: 'TOGGLE_GEOMETRY',
    UPDATE_ENTRY_ORDER: 'UPDATE_ENTRY_ORDER',
    shape: {
        UPDATE_SELECTION: 'SHAPE_UPDATE_SELECTION',
        UPDATE_FILE: 'SHAPE_UPDATE_FILE',
    },
    stack: {
        PUSH: 'STACK_PUSH',
        POP: 'STACK_POP',
        CLEAR: 'STACK_CLEAR',
    },
};

export const defaultMatrix = {
    xi: 1, yi: 0, ox: 0,
    xj: 0, yj: 1, oy: 0,
    number: '',
};

export const operationNames = {
    DEFAULT: 'DEFAULT',
    ROTATION: 'ROTATION',
    SCALE: 'SCALE',
    TRANSLATION: 'TRANSLATION',
    MANUAL: 'MANUAL',
};

export const defaultGeometry = {
    globals: false,
    locals: false,
    frames: true,
    intermediateHelpers: false,
}

export const shapeNames = {
    NONE: 'NONE',
    SQUARE: 'SQUARE',
    UNIT_CIRCLE: 'UNIT_CIRCLE',
    KNOT: 'KNOT',
    FROM_JSON: 'FROM_JSON',
};

export const defaultShapeFile = {
    fname: null,
    data: null,
};

export const entryOrders = {
    GLOBAL: 'GLOBAL',
    LOCAL: 'LOCAL',
};

function setMatrix(matrix) {
    const type = types.SET_MATRIX;
    return {type, matrix};
}

function resetMatrix() {
    const type = types.RESET_MATRIX;
    return {type};
}

function updateOperation(operationName) {
    const type = types.UPDATE_OPERATION;
    return {type, operationName};
}

function toggleGeometry(value) {
    const type = types.TOGGLE_GEOMETRY;
    return {type, value};
}

function shapeUpdateSelection(selection) {
    const type = types.shape.UPDATE_SELECTION;
    return {type, selection};
}

function shapeUpdateFile(fname, data) {
    const type = types.shape.UPDATE_FILE;
    return {type, fname, data};
}

function updateEntryOrder(entryOrder) {
    const type = types.UPDATE_ENTRY_ORDER;
    return {type, entryOrder};
}

function stackPush() {
    const type = types.stack.PUSH;
    return {type};
}

function stackPop() {
    const type = types.stack.POP;
    return {type};
}

function stackClear() {
    const type = types.stack.CLEAR;
    return {type};
}

function updateMatrix(key, value) {
    return setMatrix({[key]: value});
}

function setRotationMatrix(angle_degrees) {
    const angle_radians = angle_degrees * Math.PI / 180;
    const sin = Math.sin(angle_radians);
    const cos = Math.cos(angle_radians);
    const matrix = {
        xi: cos, yi: -sin, ox: 0,
        xj: sin, yj: cos, oy: 0,
        number: angle_degrees,
    };
    return setMatrix(matrix);
}

function setScaleMatrix(ratio) {
    const matrix = {
        xi: ratio, yi: 0, ox: 0,
        xj: 0, yj: ratio, oy: 0,
        number: ratio,
    };
    return setMatrix(matrix);
}

export default {
    setMatrix,
    resetMatrix,
    updateOperation,
    toggleGeometry,
    updateEntryOrder,
    shape: {
        updateSelection: shapeUpdateSelection,
        updateFile: shapeUpdateFile,
    },
    stack: {
        push: stackPush,
        pop: stackPop,
        clear: stackClear,
    },
    updateMatrix,
    setRotationMatrix,
    setScaleMatrix,
};
