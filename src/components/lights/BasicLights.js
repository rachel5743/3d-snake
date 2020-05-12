import { Group, DirectionalLight, AmbientLight, HemisphereLight } from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        const dir = new DirectionalLight(0xffffff, 1);
        const ambi = new AmbientLight(0x404040, 1.32);

        dir.position.set(0, 1, -1);
        dir.target.position.set(0, 0, 0);

        this.add(dir, ambi);
    }
}

export default BasicLights;
