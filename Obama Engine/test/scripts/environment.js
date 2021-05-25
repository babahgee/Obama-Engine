// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";


let xAxis = 0;

let worldLength = 100;

export function CreateFloor() {

    for (let i = 0; i < worldLength; i++) {
        const Block = new ObamaEngine.Rectangle(i * 100, Renderer.height, 100, 10, {
            backgroundColor: [255, 255, 255],
        }).ApplyTo(Renderer).RenderInCamera(Camera);

        let BlockVelocityController = new ObamaEngine.VelocityController().ApplyTo(Block);

        let BlockCollisionController = new ObamaEngine.CollisionController().ApplyTo(Block);

        BlockCollisionController.static = true;
        BlockCollisionController.leftAndRightCollision = false;
    }
}