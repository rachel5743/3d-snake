/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const camera = new PerspectiveCamera(45, window.width/window.height, 1, 10000);
const scene = new SeedScene(camera);
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
//camera.position.set(0, 100, -100);
var snakeHeadPos = scene.state.snake.state.segmentList[0].position;
camera.position.set(1, 1, 1);
//camera.lookAt(new Vector3(0, 0, 0));
camera.lookAt(new Vector3(0, 1, 50));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
// const controls = new OrbitControls(camera, canvas);
// controls.enablePan = false;
// controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    window.requestAnimationFrame(onAnimationFrameHandler);
    //controls.update();
    scene.update && scene.update(timeStamp);
    renderer.render(scene, camera);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
