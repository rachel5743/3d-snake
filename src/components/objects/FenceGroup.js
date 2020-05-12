import { Group } from 'three';
import { Fence } from 'objects';

class FenceGroup extends Group {
    constructor(parent) {
        super();

        // "Up" edge ---------------
        var fence1 = new Fence();
        this.add(fence1);
        fence1.position.set(40, 0, 49);
        fence1.rotateY(Math.PI/2);

        var fence2 = new Fence();
        this.add(fence2);
        fence2.position.set(21, 0, 49);
        fence2.rotateY(Math.PI/2);

        var fence3 = new Fence();
        this.add(fence3);
        fence3.position.set(2, 0, 49);
        fence3.rotateY(Math.PI/2);

        var fence4 = new Fence();
        this.add(fence4);
        fence4.position.set(-17, 0, 49);
        fence4.rotateY(Math.PI/2);

        // "Left" edge --------------
        var fence5 = new Fence();
        this.add(fence5);
        fence5.position.set(49, 0, 40);
        fence5.rotateY(Math.PI);

        var fence6 = new Fence();
        this.add(fence6);
        fence6.position.set(49, 0, 21);
        fence6.rotateY(Math.PI);

        var fence7 = new Fence();
        this.add(fence7);
        fence7.position.set(49, 0, 2);
        fence7.rotateY(Math.PI);

        var fence8 = new Fence();
        this.add(fence8);
        fence8.position.set(49, 0, -17);
        fence8.rotateY(Math.PI);

        var fence9 = new Fence();
        this.add(fence9);
        fence9.position.set(49, 0, -36);
        fence9.rotateY(Math.PI);

        var fence10 = new Fence();
        this.add(fence10);
        fence10.position.set(49, 0, -40);
        fence10.rotateY(Math.PI);

        // "Bottom" edge -----------
        var fence11 = new Fence();
        this.add(fence11);
        fence11.position.set(40, 0, -49);
        fence11.rotateY(-Math.PI/2);

        var fence12 = new Fence();
        this.add(fence12);
        fence12.position.set(21, 0, -49);
        fence12.rotateY(-Math.PI/2);

        var fence13 = new Fence();
        this.add(fence13);
        fence13.position.set(2, 0, -49);
        fence13.rotateY(-Math.PI/2);

        var fence14 = new Fence();
        this.add(fence14);
        fence14.position.set(-17, 0, -49);
        fence14.rotateY(-Math.PI/2);

        var fence15 = new Fence();
        this.add(fence15);
        fence15.position.set(-36, 0, -49);
        fence15.rotateY(-Math.PI/2);

        var fence16 = new Fence();
        this.add(fence16);
        fence16.position.set(-40, 0, -49);
        fence16.rotateY(-Math.PI/2);

        // "Right" edge -----------
        var fence17 = new Fence();
        this.add(fence17);
        fence17.position.set(-49, 0, -40);

        var fence18 = new Fence();
        this.add(fence18);
        fence18.position.set(-49, 0, -21);

        var fence19 = new Fence();
        this.add(fence19);
        fence19.position.set(-49, 0, -2);

        var fence20 = new Fence();
        this.add(fence20);
        fence20.position.set(-49, 0, 17);

        var fence21 = new Fence();
        this.add(fence21);
        fence21.position.set(-49, 0, 21);
    }
}

export default FenceGroup;