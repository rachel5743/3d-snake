import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './pool.glb';

// https://poly.google.com/view/bHyQe5jzdiQ
class Pool extends Group {

    constructor(parent) {
        super();

        // Load object
        const loader = new GLTFLoader();

        this.name = 'Pool';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            gltf.scene.rotateY(-Math.PI / 2);
            gltf.scene.position.set(35, 0.1, -30);
        });
    }
}

export default Pool;