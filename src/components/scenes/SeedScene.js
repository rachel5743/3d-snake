import { Scene, Color, PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide, SphereGeometry } from 'three';
import { BasicLights } from 'lights';
import { Snake } from 'objects';

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

        // Add snake
        var snake = new Snake();
        this.add(snake);

        // Make snake move automatically (should this be in Snake.js?)
        window.setInterval(function() {
            if (snake.state.direction != 0) {
                snake.moveSnake(snake.state.direction);
            }
        }, 100);
        
        // Make lights
        const lights = new BasicLights();
        this.add(lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        //Call update for each object in the updateList
        for (const obj of this.state.updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
