// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";
import { Dababy  } from "./assets.js";
import { PlayerSpriteSheetController } from "./spritesheet.js";
import { Shoot } from "./shoot.js";
import { LoadSprite } from "./spritesheet.js";

export let Player;

export function CreatePlayer() {

    // Create a player object, basically just a rectangle with a dababy image and apply it to the renderer.
    Player = new ObamaEngine.Rectangle(0, 0, 60, 90, {
        borderColor: [255, 0, 0],
    }).ApplyTo(Renderer);

    // Set the camera to the player.
    Camera.SetTo(Player).Center(true);

    // Creates and applies velocity controller to player.
    let PlayerVelocityController = new ObamaEngine.VelocityController().ApplyTo(Player);

    // Set the force strength of the velocity controller to 0.1 and the acceleration speed to 0.5;
    PlayerVelocityController.forceStrength = 0.4;
    PlayerVelocityController.accelerationSpeed = 0.2;

    // Creates and applies a collision controller to the player.
    let PlayerCollisionController = new ObamaEngine.CollisionController().ApplyTo(Player);

    let PlayerGravityController = new ObamaEngine.GravityController().ApplyTo(Player);

    let PlayerHealthBar = new ObamaEngine.Rectangle(10, -50, 40, 3, {
        backgroundColor: [0, 255, 0],
        clip: false
    }).ApplyTo(Renderer).AttachTo(Player);


    // Create a new WASD+Space key updater.
    let KeyUpdater = new ObamaEngine.WASDSpaceKeyUpdater(keys => {
        if (keys.d) PlayerVelocityController.velX = 10;
        if (keys.a) PlayerVelocityController.velX = -10;
        if (keys.s) PlayerVelocityController.Accelerate(null, 40);
        if (keys.w) PlayerVelocityController.Accelerate(null, -40);
        if (keys.space) PlayerVelocityController.velY = -10;
    });

    LoadSprite();
}