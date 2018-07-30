import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import React from 'react';
import Scene from './Scene.js';
import style from './BaseGraph.css';

export default class BaseGraph extends React.Component {
    constructor(props) {
        super(props);
        this.canvasContainer = React.createRef();
        this.canvas = React.createRef();
        this.scene = new Scene();
    }

    componentDidMount() {
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas.current, antialias: true});

        this.camera = new THREE.OrthographicCamera();
        this.camera.position.z = 1;

        this.tracker = new TrackballControls(this.camera, this.canvas.current);
        this.tracker.noRotate = true;
        this.tracker.noZoom = true;
        this.tracker.noPan = true;

        window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
        this.renderCanvas();
    }

    renderCanvas() {
        this.renderer.render(this.scene, this.camera);
        this.tracker.update();
        requestAnimationFrame(() => this.renderCanvas());
    }

    updateCamera(width, height) {
        this.camera.left = width / -2;
        this.camera.right = width / 2;
        this.camera.top = height / 2;
        this.camera.bottom = height / -2;
        this.camera.updateProjectionMatrix();
    }

    getDimensions(width, maxHeight, ratio) {
        let height = width / ratio;

        if (height > maxHeight) {
            height = maxHeight;
            width = height * ratio;
        }

        return {width, height};
    }

    setSize({offsetWidth, offsetHeight}) {
        const ratio = offsetWidth / offsetHeight;
        const {width, height} = this.getDimensions(offsetWidth, offsetHeight, ratio);
        this.renderer.setSize(
            width,
            height,
            false,  /* updateStyle */
        );
        const graphWidth = 20;
        this.updateCamera(graphWidth, graphWidth / ratio);
    }

    handleResize() {
        this.setSize(this.canvas.current);
        this.tracker.handleResize();
        this.camera.updateProjectionMatrix();
    }

    render() {
        return <canvas ref={this.canvas} className={style.canvas} />
    }
}
