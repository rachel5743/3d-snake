import { Scene, Color, PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide, TextureLoader } from 'three';
import { BasicLights } from 'lights';
import { Snake, FarmHouse, FenceGroup, Pool } from 'objects';
import TreeGroup from '../objects/TreeGroup';

class SeedScene extends Scene {
    constructor(camera) {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            snake: null,
            updateList: []
        };

        // Set background to a nice color
        this.background = new Color(0x87ceeb);

        // Make a plane for the snake to roll around in 
        // Texture made with the help of https://mebiusbox.github.io/contents/EffectTextureMaker/
        var grassTexture = new TextureLoader().load('src/textures/grassTexture.jpg');
        var geometry = new PlaneGeometry(100, 100, 32);
        var material = new MeshPhongMaterial( { color: 0xD2B48C, side: DoubleSide, map: grassTexture } );
        var plane = new Mesh(geometry, material);
        plane.rotation.x = ( -Math.PI / 2); // make it a floor
        this.add(plane);

        // Add snake
        var snake = new Snake(camera);
        this.add(snake);
        this.state.snake = snake;

        // Make snake move automatically (should this be in Snake.js?)
        window.setInterval(function() {
            if (snake.state.direction != 0) {
                snake.moveSnake(snake.state.direction);
            }
        }, 100);
        
        // Make lights
        const lights = new BasicLights();
        this.add(lights);

        // Add decorative items
        var farmhouse = new FarmHouse();
        this.add(farmhouse);

        var fence = new FenceGroup();
        this.add(fence);

        var trees = new TreeGroup();
        this.add(trees);

        var pool = new Pool();
        this.add(pool);
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
