// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";
import { Dababy } from "./assets.js";

export function CreatePlayer() {

    // Create a player object, basically just a rectangle with a dababy image and apply it to the renderer.
    let Player = new ObamaEngine.Rectangle(0, 0, 150, 90, {
        backgroundColor: [255, 0, 0],
    }).ApplyTo(Renderer).SetRenderImage(Dababy);

    // Set the camera to the player.
    Camera.SetTo(Player).Center(true);

    // Creates and applies velocity controller to player.
    let PlayerVelocityController = new ObamaEngine.VelocityController().ApplyTo(Player);

    // Set the force strength of the velocity controller to 0.1 and the acceleration speed to 0.5;
    PlayerVelocityController.forceStrength = 0.1;
    PlayerVelocityController.accelerationSpeed = 0.5;

    // Creates and applies a collision controller to the player.
    let PlayerCollisionController = new ObamaEngine.CollisionController().ApplyTo(Player);

    // Creates and applies a gravity controller to the player.
    let PlayerGravityController = new ObamaEngine.GravityController().ApplyTo(Player);

    // Create a new WASD+Space key updater.
    let KeyUpdater = new ObamaEngine.WASDSpaceKeyUpdater(keys => {
        if (keys.d) PlayerVelocityController.Accelerate(40, null);
        if (keys.a) PlayerVelocityController.Accelerate(-40, null);
        if (keys.s) PlayerVelocityController.Accelerate(null, 40);
        if (keys.w) PlayerVelocityController.Accelerate(null, -40);
    });

    // Shoot lazers
    ObamaEngine.ListenForKey(69, () => {
        let Lazer = new ObamaEngine.Rectangle(Player.x + Player.width, Player.y + (Player.height / 2), 25, 25, {
            backgroundColor: [255, 0, 0],
            blurColor: [255, 255, 255],
            blurStrength: 10,
            globalCompositeOperation: "darken"
        }).ApplyTo(Renderer).RenderInCamera(Camera);

        let LazerVelocityController = new ObamaEngine.VelocityController().ApplyTo(Lazer).AddForce(50, 0).forceStrength = 0;
    });
}