import { Group, SphereGeometry, MeshPhongMaterial, Mesh, Vector3 } from 'three';

class Snake extends Group {

    // Initializes a moving snake head
    constructor() {

        // Call parent constructor
        super();

        // Snake state: stores array of segments
        this.state = {
            direction: 0, // default: no movement
            segmentList: []
        };

        // Bindings
        var onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
        this.moveSnake.bind(this);

        // Initialize snake head
        this.addSegment();
        this.addSegment();
        this.addSegment();     
        this.addSegment();
        this.addSegment();
        this.addSegment();
        this.addSegment();

        // Get snake to move using WASD and arrow keys
        document.addEventListener("keydown", onDocumentKeyDown, false);
    }

    // Add sphere unit to snake body (called when snake grows)
    addSegment() {
        var geometry = new SphereGeometry(1, 32, 32);
        var material = new MeshPhongMaterial( { color: 0x008900 } );
        var sphere = new Mesh(geometry, material);

        // Snake's head case
        if (this.state.segmentList.length == 0) {
            sphere.position.set(0, 1, 0);
        }
        else {
            // Add new sphere at tail segment's previous position
            var tailSegment = this.state.segmentList[this.state.segmentList.length-1];
            sphere.position.set(tailSegment.x, tailSegment.y, tailSegment.z);
        }

        this.state.segmentList.push(sphere); // update internal state
        this.add(sphere);                    // add sphere to Snake
    }

    // Keydown event listener that calls moveSnake
    onDocumentKeyDown(event) {
        this.state.direction = event.keyCode;
        //this.moveSnake(event.keyCode); <-- alt. implementation: this gives snake ability to speed up
    }

    // Snake moves using WASD and arrow keys
    moveSnake(keyCode) {
        var validKeypresses = [38, 87, 37, 65, 40, 83, 39, 68];
        if (!validKeypresses.includes(keyCode)) return;
        
        this.state.isMoving = true;

        // Update positions
        var numSegments = this.state.segmentList.length; 
        for (var i = numSegments - 1; i >= 0; i--) {

            var currSegment = this.state.segmentList[i];
            var segmentDist = 1.5; // adjust snake body style

            // If the head, move in the appropriate direction
            // This code loosely adapted from https://threejs.org/examples/misc_controls_pointerlock.html
            if (i == 0) {
                switch (keyCode) {
                    case 38: // up
                    case 87: // w
                        this.state.direction = 38;
                        currSegment.position.z += segmentDist;
                        break;
                    case 37: // left
                    case 65: // a
                        this.state.direction = 37;
                        currSegment.position.x += segmentDist;
                        break;
                    case 40: // down
                    case 83: // s
                        this.state.direction = 40;
                        currSegment.position.z -= segmentDist;
                        break;
                    case 39: // right
                    case 68: // d
                        this.state.direction = 39;
                        currSegment.position.x -= segmentDist;
                        break;
                }
            }
            // Otherwise, each segment takes the position of the segment in front of it 
            else {
                var segmentInFront = this.state.segmentList[i-1];

                currSegment.position.x = segmentInFront.position.x;
                currSegment.position.y = segmentInFront.position.y;
                currSegment.position.z = segmentInFront.position.z;
            }
        }
    }
}

export default Snake;