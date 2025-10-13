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

// -----------------------------------------------------------------------------

// Resize handling
// How can scene scale be preserved on resize? - https://threejs.org/manual/#en/faq
// https://jsfiddle.net/Q4Jpu/

// remember these initial values
var tanFOV = Math.tan(((Math.PI / 180) * camera.fov / 2));
var windowHeight = window.innerHeight;

// Event Listeners
window.addEventListener('resize', onWindowResize, false);

function onWindowResize(_: UIEvent) {

    camera.aspect = window.innerWidth / window.innerHeight;

    // adjust the FOV
    camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));

    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

// ---

// prevent unwanted white flashes during resize
document.body.style.backgroundColor = "black"
