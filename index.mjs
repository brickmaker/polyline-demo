import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { getData } from './generateData.mjs'
import { createArc } from './createPath.mjs'

// renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// scene

// data
const segments = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

const arc = createArc(0, 0, 2, Math.PI / 4, Math.PI / 2)

const getGeometry = (path) => {
    const width = 0.05
    const { positions, indices } = getData(path, width)
    // attribute buffers, wrapped in a BufferGeometry
    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(indices)
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 2))
    return geometry
}


const segmentsGeometry = getGeometry(segments)
const arcGeometry = getGeometry(arc)

// vertex shader & fragment shader, wrapped in RawShaderMaterial
const vertShaderStr = `precision mediump float;
precision mediump int;

// three internally bind transform matrix with camera, don't need set it manually
uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec2 position;

void main()	{

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0., 1.0 );
}
`
const fragShaderStr = `precision mediump float;
precision mediump int;

void main()	{
    gl_FragColor = vec4(1., 0., 0., 1.);
}
`
const material = new THREE.RawShaderMaterial({
    uniforms: {},
    vertexShader: vertShaderStr,
    fragmentShader: fragShaderStr,
    // other options...
})

// object and scene
const scene = new THREE.Scene();
const segmentsMesh = new THREE.Mesh(segmentsGeometry, material)
const arcMesh = new THREE.Mesh(arcGeometry, material)
scene.add(segmentsMesh);
scene.add(arcMesh);

// camera
// perspective for general 3D scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(0, 0, 0)

// ortho for 2D scene
// const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -100, 100);

renderer.render(scene, camera);

// if we need consider resize
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
