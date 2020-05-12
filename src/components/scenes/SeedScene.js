import { Scene, Color, PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide, SphereGeometry, CubeCamera } from 'three';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: []
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Make a plane for the snake to roll around in 
        var geometry = new PlaneGeometry(100, 100, 32);
        var material = new MeshPhongMaterial( { color: 0xD2B48C, side: DoubleSide } );
        var plane = new Mesh(geometry, material);

        plane.rotation.x = ( -Math.PI / 2); // make it a floor

        this.add(plane);

        // Make a basic snake head sphere
        var sphereGeom = new SphereGeometry(1, 32, 32);
        var sphereMat = new MeshPhongMaterial( { color: 0x008900 } );
        var sphere = new Mesh(sphereGeom, sphereMat);

        //track points
        var score = 0;
        

        //randomly place mice
        /*var mouse = new Mouse();
        this.add(mouse);*/
        /*
        var pointGeom = new SphereGeometry(1, 32, 32);
        var pointMat = new MeshPhongMaterial({color: 0xffff00});
        var point = new Mesh(sphereGeom, pointMat);
        point.position.y = 1;
        point.position.x = Math.floor(Math.random()*97) - 48;
        point.position.z = Math.floor(Math.random()*97) - 48;
        this.add(point);*/

        sphere.position.y = 1;

        this.add(sphere);
    
        // Make lights
        const lights = new BasicLights();
        this.add(lights);

        // Get snake to move using WASD
        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            // This code thanks to https://threejs.org/examples/misc_controls_pointerlock.html
            switch (event.keyCode) {
                case 38: // up
                case 87: // w
                    sphere.position.z += 1;
                    break;
                case 37: // left
                case 65: // a
                    sphere.position.x += 1;
                    break;
                case 40: // down
                case 83: // s
                    sphere.position.z -= 1;
                    break;
                case 39: // right
                case 68: // d
                    sphere.position.x -= 1;
                    break;
            }
            /*if (Math.abs(sphere.position.x - mouse.position.x) < 2 && Math.abs(sphere.position.z - mouse.position.z) < 2) {
                mouse.position.x = Math.floor(Math.random()*97) - 48;
                mouse.position.z = Math.floor(Math.random()*97) - 48;
                score ++;
                
            }*/

        }

    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }

}


export default SeedScene;
