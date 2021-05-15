// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";


export function CreateFloor() {

    // Environment
    let Floor = new ObamaEngine.Rectangle(0, 500, 21000, 10, {
        backgroundColor: [255, 255, 255]
    }).ApplyTo(Renderer);

    // Creates a velocity and a collision controller and apply it to the floor. The collision controller is static so it cannot move from its position.
    let FloorVelocityController = new ObamaEngine.VelocityController().ApplyTo(Floor);
    let FloorCollisionController = new ObamaEngine.CollisionController().ApplyTo(Floor).static = true;
}