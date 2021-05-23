/*
 * ObamaEngine test JavaScript file. 
 * 
 * ---------------
 * 
 * In this file, I will test everything to make sure it works like it should.
*/


// Import ObamaEngine object.
import * as ObamaEngine from "../../engine/main.js";

// Import sibling scripts
import * as Player from "./player.js";
import * as Environment from "./environment.js";

// Create options object.
const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false,
    globalVariables: true
}

// Create canvas instance.
export const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

ObamaEngine.SetGlobalCanvasRenderer(Renderer);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Create camera.
export const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

Player.CreatePlayer();

for (let i = 0; i < 120; i++) {
    Environment.CreateFloor();
}

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
    ObamaEngine.GlobalDebug.SetObjectToGlobal({ Camera: Camera, Renderer: Renderer });
});