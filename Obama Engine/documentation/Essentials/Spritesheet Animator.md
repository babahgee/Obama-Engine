# SpriteSheetAnimator Animator
```javascript
class SpriteSheetAnimator;
```

- - -

## Intro
A SpriteSheetAnimator allows you to animate frames from a spritesheet (cut) and render it to a object dynamically. 

## Required Arguments
```javascript
new ObamaEngine.SpriteSheetAnimator(spritesheetArray);
```
- ``spritesheetArray`` | Array with sprites.

## Properties
- ``animationSets`` | An object with animation frames. (``object``).
- ``selectedAnimationSet`` | An array with selected animation frames. (``array``).
- ``spriteSheetSet`` | Set of given animations. (``array``).
- ``loop`` | Loops the animation. (``boolean`` ).
- ``hasAnimated`` | If the animation has done animating. (``boolean``).
- ``tick`` | Current animation tick. (``number``).
- ``updateSpeed`` | Update speed. (``number``).

## Methods

*This one is different than other documentations.*

```javascript
CreateAnimationSet(animationName, spriteIndexStart, spriteIndexEnd);
```
Creates an animation set.
- ``animationName`` | Name of animation which has to be a ``string``.
- ``spriteIndexStart`` | The start index of the provided sprite sheet set, which has to be a ``number``.
- ``spriteIndexEnd`` | The length from the start index of the provided spritesheet set, which has to be a ``number``.

<br/>

```javascript
SetAnimation(animationName);
```
Sets an animation.
- ``animationName`` | Sets an animation from the created animation sets, which has to be a ``string``.

<br/>

```javascript
Destroy();
```
Destroys current controller.
- Requires no arguments

<br/>

```javascript
ApplyTo(renderObject);
```
Applies current controller to a ``RenderObject`` instance.
- ``renderObject`` | RenderObject where the controller will be applied, which has to be a ``RenderObject`` instance.

## Examples
```javascript
// Import as 'ObamaEngine'.
import * as ObamaEngine from "../../engine/main.js";

// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

// Options for the canvas renderer instance.
const RendererOptions = {
    lockToWindowSize: true,
    contextMenu: false,
    globalVariables: true
}

// Creates a canvas called 'Renderer'.
const Renderer = new ObamaEngine.Canvas(window.innerWidth, window.innerHeight, RendererOptions);

// Append canvas renderer into body element.
Renderer.AppendToElement(document.body);

// Create a camera.
const Camera = new ObamaEngine.Camera(0, 0, Renderer.width, Renderer.height).ApplyTo(Renderer);

// See 'rectangle' for more information.
const Player = new ObamaEngine.Rectangle(100, 100, 100, 80, {
	backgroundColor: [255, 255, 255]
}).ApplyTo(Renderer);

// Load spritesheet image.
const PlayerSpriteSheet = await ObamaEngine.LoadImageSync("myCoolSpriteSheet.png);

// Create a spritesheet controller.
const MySpriteSheetController = new ObamaEngine.SpriteSheetController(PlayerSpriteSheet);

// Set the horizontal and vertical frame length.
MySpriteSheetController.spriteLengthX = 10;
MySpriteSheetController.spriteLengthY = 1;

// Cut the sprite sheet into seperate frames.
const CutSprites = MySpriteSheetController.Cut();

// Creates a new sprite sheet animator.
const Animator = new ObamaEngine.SpriteSheetAnimator(CutSprites);

// Loop the animation.
Animator.loop = true;

// Animate is really fast boiiii.
Animator.updateSpeed = 0;

// Select a range of frames and create a animation set of it.
Animator.CreateAnimationSet("walking-left", 0, 10);

// Let the animation play!!
Animator.SetAnimation("walking-left");

// Applies sprite sheet animator to the player.
Animator.ApplyTo(Player);

// Native update function.
function Update() {
	
	// Render the canvas.
	Renderer.Render();
	
	// Request an animation frame.
	window.requestAnimationFrame(Update);
}

// Call the update function when the webpage has been loaded.
window.addEventListener("load", Update);
```