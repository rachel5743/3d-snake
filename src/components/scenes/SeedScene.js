import { Scene, Color, PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide, TextureLoader, FontLoader, TextGeometry, MeshBasicMaterial } from 'three';
import { BasicLights } from 'lights';
import { Snake, FarmHouse, FenceGroup, Pool, Mouse} from 'objects';
import TreeGroup from '../objects/TreeGroup';
import img from '../../textures/grassTexture.png';
import json from '../fonts/helvetiker_bold.typeface.json';

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
        var grassTexture = new TextureLoader().load(img);
        var geometry = new PlaneGeometry(100, 100, 32);
        var material = new MeshPhongMaterial( { color: 0xD2B48C, side: DoubleSide, map: grassTexture } );
        var plane = new Mesh(geometry, material);
        plane.rotation.x = ( -Math.PI / 2); // make it a floor
        this.add(plane);

        // Add snake
        var snake = new Snake(camera);
        this.add(snake);
        this.state.snake = snake;

        //randomly place mice
        var mouse = new Mouse();
        this.add(mouse);

        //track points
        var score = 0;

        //text loader to display score at end
        var fLoader = new FontLoader();

        window.setInterval(function() {
            // Make snake move automatically
            if (snake.state.direction != 0) {
                snake.moveSnake(snake.state.direction);
            }

            // Mouse move code
            if (Math.sqrt(Math.pow(mouse.position.x - snake.state.segmentList[0].position.x, 2) + 
            Math.pow(mouse.position.z - snake.state.segmentList[0].position.z, 2)) < 7) {
                console.log("old pos:" + mouse.position.x + " " + mouse.position.z);
                mouse.position.x = Math.floor(Math.random()*71) - 35;
                mouse.position.z = Math.floor(Math.random()*71) - 35;
                //console.log("new pos:" + mouse.position.x + " " + mouse.position.z);
                snake.addSegment();
                score ++;
                //console.log('hit');
            }
            //check if snake crashes into fence
            if (snake.state.segmentList[0].position.x >= 49 || snake.state.segmentList[0].position.x <= -49 ||
            snake.state.segmentList[0].position.z >= 49 || snake.state.segmentList[0].position.z <= -49) {
                //game over
                /*
                fLoader.load( json, function ( fontType ) {

                    var textGeo = new TextGeometry( 'SCORE:' + score, {
                        font: fontType,
                        size: 80,
                        height: 5,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 10,
                        bevelSize: 8,
                        bevelOffset: 0,
                        bevelSegments: 5
                    } );
                    var textColor = new Color(0xFF0000);
                    var textMat = new MeshBasicMaterial({color: textColor});
                    var text =  new Mesh(textGeo, textMat);
                    this.add(text);
                });
                */
                
                var text = document.createElement('div');
                text.style.position = 'absolute';
                text.style.width = 1000;
                text.style.height = 1000;
                text.style.backgroundColor = "white";
                text.innerHTML = "Score: " + score;
                text.style.top = 300 + 'px';
                text.style.left = 600 + 'px';
                document.body.appendChild(text);
                
                
                snake.state.direction = 0;
            }
        }, 250);
    
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
