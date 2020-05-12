import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './FarmHouse.glb';

// https://poly.google.com/view/bHyQe5jzdiQ
class FarmHouse extends Group {

    constructor(parent) {
        super();

        // Load object
        const loader = new GLTFLoader();

        this.name = 'FarmHouse';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            gltf.scene.position.set(-37, 0.5, 40);
            gltf.scene.rotateY(Math.PI);
        });
    }
}

export default FarmHouse;