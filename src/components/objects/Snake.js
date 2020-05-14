import { Group, SphereGeometry, MeshPhongMaterial, Mesh, Vector3 } from 'three';

class Snake extends Group {

    // Initializes a moving snake head
    constructor(camera) {

        // Call parent constructor
        super();

        // Snake state: stores array of segments
        this.state = {
            camera: camera,
            direction: 0, // relative direction of snake. 0: no movement
            segmentList: []
        };

        // Bindings
        var onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
        this.moveSnake.bind(this);
        this.moveUp.bind(this);
        this.moveRight.bind(this);
        this.moveDown.bind(this);
        this.moveLeft.bind(this);

        // Initialize snake head 
        // (Added extra segments to test / show snake body; for initial snake, modify this as desired!)
        for (let i = 0; i < 30; i++) {
            this.addSegment();
        }

        // Get snake to move using WASD and arrow keys
        document.addEventListener("keydown", onDocumentKeyDown, false);
    }

    // Add sphere unit to snake body (called when snake grows)
    addSegment() {
        var geometry = new SphereGeometry(1, 32, 32);
        var material = new MeshPhongMaterial( { color: 0xFF6347 } );
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

    // Keydown event listener that adjusts snake's direction
    onDocumentKeyDown(event) {
        // Only listen for valid keypresses
        var validKeypresses = [38, 37, 40, 39];
        if (!validKeypresses.includes(event.keyCode)) return;

        // If snake not previously moving, relative direction = absolute direction specified
        if (this.state.direction == 0) {
            this.state.direction = event.keyCode;
            return;
        }

        // Otherwise (if snake is already moving), adjust relative direction
        // This code loosely adapted from https://threejs.org/examples/misc_controls_pointerlock.html
        var originalDirection = this.state.direction;
        switch (event.keyCode) {
            case 38:
                break;

            case 37:
                switch (originalDirection) {
                    case 38:
                        this.state.direction = 37;
                        break;
                    case 37:
                        this.state.direction = 40;
                        break;
                    case 40:
                        this.state.direction = 39;
                        break;
                    case 39:
                        this.state.direction = 38;
                        break;
                }
                break;
        
            case 40:
                switch (originalDirection) {
                    case 38:
                        this.state.direction = 40;
                        break;
                    case 37:
                        this.state.direction = 39;
                        break;
                    case 40:
                        this.state.direction = 38;
                        break;
                    case 39:
                        this.state.direction = 37;
                        break;
                }
                break;

            case 39:
                switch (originalDirection) {
                    case 38:
                        this.state.direction = 39;
                        break;
                    case 37:
                        this.state.direction = 38;
                        break;
                    case 40:
                        this.state.direction = 37;
                        break;
                    case 39:
                        this.state.direction = 40;
                        break;
                }
                break;
        }
    }

    // Snake moves using WASD and arrow keys
    moveSnake(keyCode) {
        var validKeypresses = [38, 87, 37, 65, 40, 83, 39, 68];
        if (!validKeypresses.includes(keyCode)) return;

        // Update positions
        var numSegments = this.state.segmentList.length; 
        for (var i = numSegments - 1; i >= 0; i--) {

            var currSegment = this.state.segmentList[i];
            var segmentDist = 1.5; // adjust snake body style

            // If the head, move in the appropriate direction
            // This code loosely adapted from https://threejs.org/examples/misc_controls_pointerlock.html
            if (i == 0) {
                // Move head in specified (absolute) direction
                switch (this.state.direction) {
                    case 38:
                        this.moveUp(currSegment, segmentDist);
                        break;
                    case 37:
                        this.moveLeft(currSegment, segmentDist);
                        break;
                    case 40:
                        this.moveDown(currSegment, segmentDist);
                        break;
                    case 39:
                        this.moveRight(currSegment, segmentDist);
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

    // Helper functions for movement
    // Absolute directions for the snake 
    moveUp(currSegment, segmentDist) {
        this.state.direction = 38;
        currSegment.position.z += segmentDist;
        this.state.camera.position.z += segmentDist;
        this.state.camera.lookAt(currSegment.position.x, 1, 50);
    }

    moveLeft(currSegment, segmentDist) {
        this.state.direction = 37;
        currSegment.position.x += segmentDist;
        this.state.camera.position.x += segmentDist;
        this.state.camera.lookAt(50, 1, currSegment.position.z);
    }

    moveDown(currSegment, segmentDist) {
        this.state.direction = 40;
        currSegment.position.z -= segmentDist;
        this.state.camera.position.z -= segmentDist;
        this.state.camera.lookAt(currSegment.position.x, 1, -50);
    }

    moveRight(currSegment, segmentDist) {
        this.state.direction = 39;
        currSegment.position.x -= segmentDist;
        this.state.camera.position.x -= segmentDist;
        this.state.camera.lookAt(-50, 1, currSegment.position.z);
    }
}

export default Snake;