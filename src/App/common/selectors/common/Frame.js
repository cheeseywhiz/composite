import * as THREE from 'three';

class Vector extends THREE.Vector3 {
    isZero() {
        return identityFrame.origin.equals(this);
    }

    spherical() {
        // Differs from THREE.Spherical.setFromVector3
        // phi is equator angle from +x axis
        // theta is polar angle from +z axis
        // https://upload.wikimedia.org/wikipedia/commons/4/4f/3D_Spherical.svg
        const radius = this.length();
        const theta = identityFrame.kHat.angleTo(this);
        let xyProjection = new this.constructor(this.x, this.y, 0);
        if (xyProjection.isZero()) xyProjection = identityFrame.iHat;
        let phi = identityFrame.iHat.angleTo(xyProjection);
        if (xyProjection.y < 0) phi *= -1;
        return {radius, theta, phi};
    }
}

export default class Frame extends THREE.Matrix4 {
    updateVectors() {
        const te = this.elements;
        this.iHat = new Vector(te[0], te[1], te[2], te[3]);
        this.jHat = new Vector(te[4], te[5], te[6], te[7]);
        this.kHat = new Vector(te[8], te[9], te[10], te[11]);
        this.origin = new Vector(te[12], te[13], te[14], te[15]);
        return this;
    }

    set(
        xi, yi, zi, ox,
        xj, yj, zj, oy,
        xk, yk, zk, oz,
        xh, yh, zh, oh,
    ) {
        super.set(
            xi, yi, zi, ox,
            xj, yj, zj, oy,
            xk, yk, zk, oz,
            xh, yh, zh, oh,
        );
        this.updateVectors();
        return this;
    }

    multiplyMatrices(a, b) {
        super.multiplyMatrices(a, b);
        this.updateVectors();
        return this;
    }

    fromArray(array) {
        super.fromArray(array);
        this.updateVectors();
        return this;
    }

    clone() {
        return new Frame().fromArray(this.elements);
    }

    isIdentity() {
        return this.equals(identityFrame);
    }

    atPoint(x, y, z) {
        return this
            .clone()
            .multiply(identityFrame
                .clone()
                .makeTranslation(x, y, z)
            ).origin;
    }

    atVector(vector) {
        const {x, y, z} = vector;
        return this.atPoint(x, y, z);
    }
}

export const identityFrame = new Frame().identity();
