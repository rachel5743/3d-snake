import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './tree.glb';

// https://poly.google.com/view/68OOL4zL6Co
class Tree extends Group {

    constructor(parent) {
        super();

        // Load object
        const loader = new GLTFLoader();

        this.name = 'Tree';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Tree;