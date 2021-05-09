import * as ObamaEngine from "./engine/main.js";

// Create options object.
const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false
}

// Create canvas instance.
const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

const { element } = Renderer;

element.style = "position: fixed; top: 0; left: 0;";

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Set the background color.
Renderer.SetBackgroundColor([0, 0, 0]);

// Create camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// Create a style object for the rectangle.
const RectangleStyles = {
    borderColor: [255, 255, 255],
    borderWidth: 10,
    blurStrength: 20,
    blurColor: [255, 255, 255]
}

// Create a rectangle
const EpicRectangle = new ObamaEngine.Rectangle(120, 120, 310, 140, RectangleStyles).ApplyTo(Renderer);

// Hover event on the rectangle.
EpicRectangle.On("bruh", event => {

});

// Create a update function.
function update() {
    window.requestAnimationFrame(update);

    Renderer.Render();
}

// Call the update function when the page has been loaded.
window.addEventListener("load", event => {
    update();
});