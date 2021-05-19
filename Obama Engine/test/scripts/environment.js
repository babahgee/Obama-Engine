// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";


let xAxis = 0;

let GrassBlock = await ObamaEngine.LoadImageSync("https://live.staticflickr.com/3516/3811405243_70511d8797_b.jpg");

export function CreateFloor() {
    let Block = new ObamaEngine.Rectangle(xAxis * 100, 500, 100, 100, {
        backgroundColor: [ObamaEngine.RandomBetween(0, 255), ObamaEngine.RandomBetween(0, 255), 255]
    }).ApplyTo(Renderer).RenderInCamera(Camera).SetRenderImage(GrassBlock);

    let BlockVelocityController = new ObamaEngine.VelocityController().ApplyTo(Block);
    let BlockCollisionController = new ObamaEngine.CollisionController().ApplyTo(Block);

    BlockCollisionController.static = true;
    BlockCollisionController.leftAndRightCollision = false;


    xAxis += 1;
}