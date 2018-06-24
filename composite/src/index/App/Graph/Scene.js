import * as THREE from 'three';
import zip from '../../common/zip.js';
import {operationNames, } from '../../actions.js';
import {identityFrame, } from '../common/Frame.js';
import {getShape, } from './shapes.js';

export default class Scene extends THREE.Scene {
    clear() {
        this.remove(...this.children.reverse());
    }

    addGeometry(geometry, color = 0xff8c00) {
        const faceMaterial = new THREE.MeshBasicMaterial({
            color, transparent: true, opacity: 0.75,
        });
        faceMaterial.side = THREE.DoubleSide;
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x14ae6e, wireframe: true, wireframeLinewidth: 3,
        });
        const faceMesh = new THREE.Mesh(geometry, faceMaterial);
        const wireMesh = new THREE.Mesh(geometry, wireMaterial);
        this.add(faceMesh);
        this.add(wireMesh);
        return geometry;
    }

    addArrow(vector, origin, color) {
        const arrow = new THREE.ArrowHelper(
            vector.clone().normalize(),
            origin,
            vector.length(),
            color,
            1 / 3,
            1 / 3,
        );
        arrow.line.material.linewidth = 3;
        this.add(arrow);
    }

    addArrows(frame) {
        this.addArrow(frame.iHat, frame.origin, 0xff0000);
        this.addArrow(frame.jHat, frame.origin, 0x00ff00);
    }

    addFrame(frame, color, shapeName, drawVectors) {
        const shapeFunc = getShape(shapeName);

        if (shapeFunc) {
            const buffer = shapeFunc();
            buffer.applyMatrix(frame);
            this.addGeometry(buffer, color);
        }

        if (drawVectors) this.addArrows(frame);
    }

    addTranslation(initial, final) {
        const change = new THREE.Vector3().subVectors(
            final.origin, initial.origin
        );
        this.addArrow(change, initial.origin, 0x0000ff);
    }

    addGlobalHelper(operation, initial, final) {
        switch (operation) {
            case operationNames.TRANSLATION:
                this.addTranslation(initial, final);
                break;
        }
    }

    addLocalHelper(operation, initial, final) {
        switch (operation) {
            case operationNames.TRANSLATION:
                this.addTranslation(initial, final);
                break;
        }
    }

    helpersAdder(addHelper) {
        return (operations, changes) => {
            zip(operations, changes)
                .forEach(([operation, [initial, final]]) => {
                    addHelper(operation, initial, final);
                });
        };
    }

    addGlobalHelpers = this.helpersAdder(this.addGlobalHelper.bind(this));
    addLocalHelpers = this.helpersAdder(this.addLocalHelper.bind(this));
}
