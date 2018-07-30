import * as THREE from 'three';
import {createSelector, } from 'reselect';
import {operationNames, } from '../../../common/actions.js';
import zip, {range, } from '../../../common/zip.js';
import Frame, {identityFrame, } from './common/Frame.js';
import baseSelectors from './common/baseSelectors.js';
import shapeSelectors from './common/shapeSelectors/shapeSelectors.js';
import stackSelectors from './common/stackSelectors.js';

const palette = {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    black: 0x000000,
    white: 0xffffff,
    orange: 0xff7f00,
    gray: 0x14ae6e,
};

const colors = {
    iHat: palette.red,
    jHat: palette.green,
    first: palette.black,
    last: palette.white,
    globals: palette.red,
    locals: palette.blue,
    rotation: palette.black,
    scale: palette.orange,
    translation: palette.blue,
    wire: palette.gray,
};

function addGeometry(geometry, color = 0xff8c00) {
    const faceMaterial = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.75,
    });
    faceMaterial.side = THREE.DoubleSide;
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: colors.wire, wireframe: true, wireframeLinewidth: 3,
    });
    return [
        new THREE.Mesh(geometry, faceMaterial),
        new THREE.Mesh(geometry, wireMaterial),
    ];
}

function addArrow(vector, origin, color) {
    const arrow = new THREE.ArrowHelper(
        vector.clone().normalize(),
        origin,
        vector.length(),
        color,
        1 / 3,
        1 / 3,
    );
    arrow.line.material.linewidth = 3;
    return arrow;
}

function addArrows(frame) {
    return [
        addArrow(frame.iHat, frame.origin, colors.iHat),
        addArrow(frame.jHat, frame.origin, colors.jHat),
    ];
}

const selectAddFrame = createSelector(
    shapeSelectors.geometry, baseSelectors.geometry,
    (shapeGeometry, geometry) => (color) => (frame) => {
        const objects = [];

        if (shapeGeometry) {
            const geometryClone = shapeGeometry.clone();
            geometryClone.applyMatrix(frame);
            objects.push(addGeometry(geometryClone, color));
        }

        if (geometry.frames) objects.push(addArrows(frame));
        return objects;
    }
);

const selectFrames = createSelector(
    selectAddFrame, stackSelectors.globals, stackSelectors.locals,
    baseSelectors.geometry,
    (addFrame, globals, locals, geometry) => {
        const objects = [];
        const first = globals.slice(0, 1);
        const last = globals.slice(-1);
        objects.push(first.map(addFrame(colors.first)));
        if (geometry.locals) objects.push(locals.slice(1, -1).map(addFrame(colors.locals)));
        if (geometry.globals) objects.push(globals.slice(1, -1).map(addFrame(colors.globals)));
        if (globals.length > 1) objects.push(last.map(addFrame(colors.last)));
        return objects;
    }
);

function addSector(radius, startAngle, endAngle, center) {
    const buffer = new THREE.CircleBufferGeometry(
        radius, 4, startAngle, endAngle - startAngle,
    );
    const {x, y, z} = center;
    const frame = new Frame().makeTranslation(x, y, z);
    buffer.applyMatrix(frame);
    return addGeometry(buffer, colors.rotation);
}

function addRotation(start, end, center) {
    const {radius, phi} = start.spherical();
    return addSector(
        radius,
        phi,
        end.spherical().phi,
        center,
    );
}

function addLine(start, end, color) {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(end);
    const material = new THREE.LineBasicMaterial({color});
    return new THREE.Line(geometry, material);
}

function addAxes() {
    const width = 100;
    return [
        addLine(
            new THREE.Vector3(-width, 0, 0),
            new THREE.Vector3(width, 0, 0),
            palette.red,
        ),
        addLine(
            new THREE.Vector3(0, -width, 0),
            new THREE.Vector3(0, width, 0),
            palette.green,
        ),
    ];
}

// [a, b, c, d] => [[a, b], [b, c], [c, d]]
const consecutivePairs = (array) => range(array.length - 1)
    .map((index) => [array[index], array[index + 1]]);

class ChangeHelper {
    set(initial, final) {
        this.initial = initial;
        this.final = final;
        return this;
    }

    addGlobalRotation() {
        return addRotation(
            this.initial.origin,
            this.final.origin,
            identityFrame.origin,
        );
    }

    addLocalRotation() {
        return addRotation(
            this.initial.iHat,
            this.final.iHat,
            this.initial.origin,
        );
    }

    addGlobalScaleLine(through) {
        const start = identityFrame.origin;
        const end = this.final.atVector(through);
        return addLine(start, end, colors.scale);
    }

    addGlobalScale() {
        return [
            this.addGlobalScaleLine(identityFrame.iHat),
            this.addGlobalScaleLine(identityFrame.jHat),
            this.addTranslation(),
        ];
    }

    addLocalScaleLine(through) {
        const start = this.initial.origin;
        const end = this.final.atVector(through);
        const axis = new THREE.Vector3()
            .subVectors(end, start)
            .normalize()
            .multiplyScalar(30);
        const axisEnd = start.clone().add(axis);
        return addLine(start, axisEnd, colors.scale);
    }

    addLocalScale() {
        return [
            this.addLocalScaleLine(new THREE.Vector3(1, 1, 0)),
            this.addLocalScaleLine(identityFrame.iHat),
            this.addLocalScaleLine(identityFrame.jHat),
        ];
    }

    addTranslation() {
        const change = new THREE.Vector3().subVectors(
            this.final.origin, this.initial.origin
        );
        return addArrow(change, this.initial.origin, colors.translation);
    }

    addGlobalHelper(operation) {
        if (identityFrame.origin.equals(this.initial.origin)) {
            return this.addLocalHelper(operation);
        }

        switch (operation) {
            case operationNames.ROTATION:
                return this.addGlobalRotation();
            case operationNames.SCALE:
                return this.addGlobalScale();
            case operationNames.TRANSLATION:
                return this.addTranslation();
        }
    }

    addLocalHelper(operation) {
        switch (operation) {
            case operationNames.ROTATION:
                return this.addLocalRotation();
            case operationNames.SCALE:
                return this.addLocalScale();
            case operationNames.TRANSLATION:
                return this.addTranslation();
        }
    }
}

const [addGlobalHelpers, addLocalHelpers] = ((changeHelper) => (
    [changeHelper.addGlobalHelper, changeHelper.addLocalHelper]
        .map((func) => func.bind(changeHelper))
        .map((method) => ([initial, final]) => (operation) => {
            changeHelper.set(initial, final);
            return method(operation);
        })
        .map((getHelperAdder) => (intermediates, stack) => (
            zip(
                consecutivePairs(intermediates).map(getHelperAdder),
                stack.map(baseSelectors.operation),
            ).map(([addHelper, operation]) => addHelper(operation))
        ))
))(new ChangeHelper());

const selectIntermediateHelpers = createSelector(
    baseSelectors.geometry, stackSelectors.globals,
    stackSelectors.locals, stackSelectors.full,
    (geometry, globals, locals, full) => {
        const objects = [];

        if (geometry.intermediateHelpers && globals.length > 1) {
            if (geometry.globals) {
                objects.push(addGlobalHelpers(globals, [...full]));
            }

            if (geometry.locals) {
                objects.push(addLocalHelpers(locals, [...full].reverse()));
            }
        }

        return objects;
    }
);

export default createSelector(
    selectFrames, selectIntermediateHelpers,
    (frames, intermediateHelpers) => [
        addAxes(),
        frames,
        intermediateHelpers,
    ]
);
