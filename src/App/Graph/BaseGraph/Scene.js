import * as THREE from 'three';

const flatten = (array) => (
    array.reduce((accumulator, currentValue) => (
        Array.isArray(currentValue)
            ? accumulator.concat(flatten(currentValue))
            : accumulator.concat(currentValue)
    ), [])
);

export default class Scene extends THREE.Scene {
    clear() {
        this.remove(...this.children.reverse());
    }

    addAll(objects) {
        flatten([objects]).forEach((object) => this.add(object));
    }
}
