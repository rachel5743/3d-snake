import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Mouse.glb';

// https://poly.google.com
class Mouse extends Group {

    constructor(parent) {
        super();

        // Load object
        const loader = new GLTFLoader();

        this.name = 'Mouse';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            gltf.scene.position.set(0, 1, 0);
            //gltf.scene.position.set(Math.floor(Math.random()*97) - 48, 1, Math.floor(Math.random()*97) - 48);
            //gltf.scene.rotateY(Math.PI);
        });
    }
}

export default Mouse;