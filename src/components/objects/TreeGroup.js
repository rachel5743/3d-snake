import { Group } from 'three';
import { Tree } from 'objects';

class TreeGroup extends Group {
    constructor(parent) {
        super();

        var tree = new Tree();
        tree.position.set(40, 0.1, 40);
        this.add(tree);

        var tree2 = new Tree();
        tree2.position.set(-30, 0.1, -40);
        this.add(tree2);

        var tree3 = new Tree();
        tree3.position.set(-40, 0.1, -34);
        this.add(tree3);
    }
}

export default TreeGroup;