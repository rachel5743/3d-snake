import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Fence.glb';

// https://poly.google.com/view/8r5ZAEhrppD
class Fence extends Group {

    constructor(parent) {
        super();

        // Load object
        const loader = new GLTFLoader();

        this.name = 'Fence';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Fence;