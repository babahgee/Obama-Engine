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

// Create camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// Loads Dababy native image resource.
let Dababy = await ObamaEngine.LoadImageSync("../engine/nativeResources/images/Dababy.png");
//let BigWallpaperImge = await ObamaEngine.LoadImageSync("https://images.hdqwalls.com/wallpapers/retro-big-sunset-5k-9t.jpg");

//let WallPaper = new ObamaEngine.Rectangle(0, 0, 5120, 2880, { backgroundColor: [0, 0, 0] }).ApplyTo(Renderer).SetRenderImage(BigWallpaperImge);



// Create a player object, basically just a rectangle with a dababy image and apply it to the renderer.
let Player = new ObamaEngine.Rectangle(0, 0, 150, 90, {
    backgroundColor: [255, 0, 0],
}).ApplyTo(Renderer).SetRenderImage(Dababy);

// Set the camera to the player.
Camera.SetTo(Player).Center(true);

// Creates and applies velocity controller to rectangle.
let PlayerVelocityController = new ObamaEngine.VelocityController().ApplyTo(Player);

// Set the force strength of the velocity controller to 0.1 and the acceleration speed to 0.5;
PlayerVelocityController.forceStrength = 0.1;
PlayerVelocityController.accelerationSpeed = 0.5;

// Creates and applies a collision controller to the rectangle.
let PlayerCollisionController = new ObamaEngine.CollisionController().ApplyTo(Player);

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


// Environment
let Floor = new ObamaEngine.Rectangle(0, 500, 21000, 10, {
    backgroundColor: [255, 255, 255]
}).ApplyTo(Renderer);

// Creates a velocity and a collision controller and apply it to the floor. The collision controller is static so it cannot move from its position.
let FloorVelocityController = new ObamaEngine.VelocityController().ApplyTo(Floor);
let FloorCollisionController = new ObamaEngine.CollisionController().ApplyTo(Floor).static = true;

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
    ObamaEngine.GlobalDebug.SetObjectToGlobal({ Camera: Camera, Player: Player, PlayerVelocityController: PlayerVelocityController, Renderer: Renderer });
});