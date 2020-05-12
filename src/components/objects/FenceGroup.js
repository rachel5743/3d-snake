import { Group } from 'three';
import { Fence } from 'objects';

class FenceGroup extends Group {
    constructor(parent) {
        super();

        var fence1 = new Fence();
        this.add(fence1);
        fence1.position.set(40, 0, 49);
        fence1.rotateY(Math.PI/2);

        var fence2 = new Fence();
        this.add(fence2);
        fence2.position.set(21, 0, 49);
        fence2.rotateY(Math.PI/2);




    }
}

export default FenceGroup;