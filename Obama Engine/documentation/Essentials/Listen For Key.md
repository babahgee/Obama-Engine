# Listen For Key
```js
void function ListenForKey;
```
- - -

## Intro
The 'ListenForKey' is a shortned version of listening keydown events from the window object. With this function, you can
easily listen for keys based on their key codes.

## Required arguments.
```js
ObamaEngine.ListenForKey(keyCode, listener);
```
- ``keyCode`` | A key its keycode. ``number``
- ``listener`` | Anonmous function when provided key got pressed. ``function``

## Examples
```js
// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

ObamaEngine.ListenForKey(69, event => {
    console.log("Pressing 'E' button");
});

```