// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";


let xAxis = 0;

export function CreateFloor() {

    let Block = new ObamaEngine.Rectangle(xAxis * 100, Renderer.height, 100, 10, {
        backgroundColor: "#000",
    }).ApplyTo(Renderer).RenderInCamera(Camera);

    let BlockVelocityController = new ObamaEngine.VelocityController().ApplyTo(Block);
    let BlockCollisionController = new ObamaEngine.CollisionController().ApplyTo(Block);

    BlockCollisionController.static = true;
    BlockCollisionController.leftAndRightCollision = false;


    xAxis += 1;
}