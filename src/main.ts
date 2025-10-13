import * as THREE from 'three';

const scene = new THREE.Scene();

const cameraFOV = 75;
const cameraAspectRatio = window.innerWidth / window.innerHeight;
const cameraNearClippingPlane = 0.1;
const cameraFarClippingPlane = 1000;
const camera = new THREE.PerspectiveCamera(cameraFOV, cameraAspectRatio, cameraNearClippingPlane, cameraFarClippingPlane);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
