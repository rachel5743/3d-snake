import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Mouse.glb';

// https://poly.google.com/view/6DOjEGKd8nx
class Mouse extends Group {

    constructor(parent) {
        super();

        // Load object
        const loader = new GLTFLoader();

        this.name = 'Mouse';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            //gltf.scene.position.set(20, 0, 20);
            
            gltf.scene.position.set(Math.floor(Math.random()*71) - 35, 0, Math.floor(Math.random()*71) - 35);
            //gltf.scene.rotateY(Math.PI);
        });
    }
    //move mouse location
    move() {
        gltf.scene.position.set(Math.floor(Math.random()*71) - 35, 0, Math.floor(Math.random()*71) - 35);
    }
}

export default Mouse;