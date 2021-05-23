# Spritesheet Controller
```js
class SpriteSheetController;
```

- - -

## Into
A spritesheet controller allows you to handle animations from a image source. You can cut the provided
image into seperate sprites. Really useful for 2D animations. This works together with the ``SpriteSheetAnimator`` class.

## Required arguments
```javascript
new SpriteSheetController(spritesheetImage);
```
This controller requires one argument which has to be a ``HTMLImage`` element. You can load images using the native
``LoadImageSync`` method.

## Properties
- ``cutSprites`` | Returns a array with cut sprites.
- ``spriteLengthX`` | Set the length of horizontal sprites. This is required in order to cut the spritesheet.
- ``spriteLengthY`` | Set the length of vertical sprites. This is required in order to cut the spritesheet.
- ``width`` | Actual width of the provided image. Will set automatically.
- ``height`` | Actual height of the provided image. Will set automatically.

## Methods
- ``Cut()`` | Cuts the provided spritesheet into seperate frames based on the ``spriteLengthX`` and ``spriteLengthY`` properties.

## Examples

```javascript
// A whole new Canvas is not necessary for this example. The focus is only on this spritesheet controller.

// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

// Load image asynchronously.
let MyCoolSpritesheet = await ObamaEngine.LoadImageSync("path_to_image_here.png");

// Create a spritesheet controller.
let SpritesheetController = new ObamaEngine.SpriteSheetController(MyCoolSpritesheet);

// Set the length of horizontal frame.s
SpritesheetController.spriteLengthX = 10;

// set the length of vertical frames.
SpritesheetController.spriteLengthY = 2;

// Cut the sprites into seperate frames.
let CutSprites = SpritesheetController.Cut(); // Returns an array with images.

```