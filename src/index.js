import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// window size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// dat.gui
const gui = new dat.GUI();

// DOM element
const canvas = document.getElementById("webgl");

// scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(size.width, size.height);

//camera position
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

// add geometries
const box = new THREE.BoxBufferGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(box, material);
scene.add(mesh);

// add lights
const light1 = new THREE.PointLight("red", 100, 5, 1);
scene.add(light1);
light1.position.set(1, 4, 3);

const light2 = new THREE.AmbientLight("blue", 100, 5, 1);
scene.add(light2);
light1.position.set(-4, -3, 3);



// helpers
var gridXZ = new THREE.GridHelper(100, 10);
scene.add(gridXZ);

// resize canvas
window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width/size.height;

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const animate = () => {
    controls.update();
    window.requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.z += 0.01;
    
    renderer.render(scene, camera);
}

animate();