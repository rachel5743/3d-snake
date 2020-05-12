import { Group, SphereGeometry, MeshPhongMaterial, Mesh, Vector3 } from 'three';

class Snake extends Group {

    // Initializes a moving snake head
    constructor() {

        // Call parent constructor
        super();

        // Snake state: stores array of segments
        this.state = {
            head: Mesh,
            tail: Mesh,
            tailPrevPos: Vector3,
            segmentList: []
        };
        
        // Initialize
        this.addSegment();
        this.addSegment();

        // Get snake to move using WASD and arrow keys
        var onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
        document.addEventListener("keydown", onDocumentKeyDown, false);
    }

    // Add sphere unit to snake body (called when snake grows)
    addSegment() {
        var geometry = new SphereGeometry(1, 32, 32);
        var material = new MeshPhongMaterial( { color: 0x008900 } );
        var sphere = new Mesh(geometry, material);

        // Snake head case
        if (this.state.segmentList.length == 0) {
            sphere.position.set(0, 1, 0);
            this.state.head = sphere;
        }
        else {
            // Add new sphere at tail segment's previous position
            //sphere.position.set(this.state.tailPrevPos.x, this.state.tailPrevPos.y, this.state.tailPrevPos.z);
            sphere.position.set(2, 1, 0);
        }

        // Update tail and previous tail position
        this.state.tail = sphere;

        this.state.segmentList.push(sphere); // update internal state
        this.add(sphere);                    // add sphere to Snake
    }

    // Snake moves using WASD and arrow keys
    onDocumentKeyDown(event) {

        this.tailPrevPos = this.state.tail.position; // store previous tail position

        // This code thanks to https://threejs.org/examples/misc_controls_pointerlock.html
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                this.state.segmentList.forEach(segment => {
                    segment.position.z += 1;
                });
                break;
            case 37: // left
            case 65: // a
                this.state.segmentList.forEach(segment => {
                    segment.position.x += 1;
                });
                break;
            case 40: // down
            case 83: // s
                this.state.segmentList.forEach(segment => {
                    segment.position.z -= 1;
                });
                break;
            case 39: // right
            case 68: // d
                this.state.segmentList.forEach(segment => {
                    segment.position.x -= 1;
                });
                break;
        }
    }
}

export default Snake;