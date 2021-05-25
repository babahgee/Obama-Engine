# WASD + Space Key Updater
```js
class WASDSpaceKeyUpdater;
```

- - -

## Intro
A 'WASDSpaceKeyUpdater' class allows you to listen for the W, A, S, D and Space key in each update frame. It gives the 
ability to create direct movements.

## Required arguments
```js
new ObamaEngine.WASDSpaceKeyUpdater(listener);
```
- ``listener`` | An anonymous function that will be called if any of the keys are pressed. The function will be called withan argument called 'keys' which is an ``object``, containing booleans for the keys.

## Methods

```js
Destroy();
```
Destroys instance.

<br>

```js
ChangeKeyState(keyCode, state);
```
Changes key states to a ``boolean``.
- ``keyCode`` | ``number``.
- ``state`` | ``boolean``.

## Examples

```js
// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

function MyListener(keys) {
    if(keys.d) {
        console.log("Pressing key 'd'");
    }
    if(keys.a) {
        console.log("Pressing key 'a'");
    }
    if(keys.s) {
        console.log("Pressing key 's'");
    }
    if(keys.w) {
        console.log("Pressing key 'w'");
    }
    if(keys.space) {
        console.log("Pressing key 'space'");
    }
}

const MyKeyUpdater = new ObamaEngine.WASDSpaceKeyUpdater(MyListener);
```