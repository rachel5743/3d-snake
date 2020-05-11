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

        sphere.position.y = 1;

        this.add(sphere);
    
        // Make lights
        const lights = new BasicLights();
        this.add(lights);

        // Get snake to move using WASD
        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            switch (event.keyCode) {
                case 87: // w
                    sphere.position.z += 1;
                    break;
                case 65: // a
                    sphere.position.x += 1;
                    break;
                case 83: // s
                    sphere.position.z -= 1;
                    break;
                case 68: // d
                    sphere.position.x -= 1;
                    break;
            }
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
