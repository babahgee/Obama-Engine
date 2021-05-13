/*
 * ObamaEngine test JavaScript file. 
 * 
 * ---------------
 * 
 * In this file, I will test everything to make sure it works like it should.
*/


// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Create options object.
const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false,
    globalVariables: true
}

// Create canvas instance.
const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

ObamaEngine.SetGlobalCanvasRenderer(Renderer);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Set the background color.
Renderer.SetBackgroundColor([255, 255, 255]);

// Create camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// Create a player object, basically just a rectangle.
let Player = new ObamaEngine.Rectangle(0, 0, 50, 50, {
    backgroundColor: [0, 0, 0],
    blurColor: [0, 0, 0],
    blurStrength: 50,
}).ApplyTo(Renderer);

// Set the camera to the player.
Camera.SetTo(Player).Center(true);

// Applies velocity controller to rectangle.
let PlayerVelocityController = new ObamaEngine.VelocityController().ApplyTo(Player);

// Set the force strength of the velocity controller to 0.5;
PlayerVelocityController.forceStrength = 0.5;

let PlayerColissionController = new ObamaEngine.CollisionController();

PlayerColissionController.ApplyTo(Player);

// Create a new WASD+Space key updater.
let KeyUpdater = new ObamaEngine.WASDSpaceKeyUpdater(keys => {
    if (keys.d) PlayerVelocityController.velX = 10;
    if (keys.a) PlayerVelocityController.velX = -10;
    if (keys.s) PlayerVelocityController.velY = 10;
    if (keys.w) PlayerVelocityController.velY = -10;
});

// Native update function.
function Update() {

    // Render the canvas.
    Renderer.Render();

    // Request an animation frame.
    window.requestAnimationFrame(Update);
}

// Call the update function when the page has been loaded.
window.addEventListener("load", event => {
    Update();

    // Set some variables public.
    ObamaEngine.GlobalDebug.SetObjectToGlobal({ Camera: Camera, Player: Player, PlayerVelocityController: PlayerVelocityController });
});