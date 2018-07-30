import * as THREE from 'three';

function verticesToBuffer(vertices) {
    const buffer = new THREE.BufferGeometry();
    const typedVertices = new Float32Array(vertices);
    buffer.addAttribute('position', new THREE.BufferAttribute(typedVertices, 3));
    return buffer;
}

const Square = () => verticesToBuffer([
        0, 0, 0,
        1, 0, 0,
        1, 1, 0,

        0, 0, 0,
        1, 1, 0,
        0, 1, 0,
]);

const UnitCircle = () => new THREE.CircleBufferGeometry(1, 16);

const Knot = () => new THREE.TorusKnotBufferGeometry();

const loader = new THREE.JSONLoader();
const FromData = (data) => data && loader.parse(data, 'models/').geometry;

export default {
    None: null, Square, UnitCircle, Knot, FromData,
};
