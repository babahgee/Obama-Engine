# Random Between
```ts
int function RandomBetween;
```

- - - 

## Intro
The 'RandomBetween' function returns a value between 2 numbers, a minimum and a maximum. Return value will always be a 
``int`` type.

## Required arguments
```js
ObamaEngine.RandomBetween(number1, number2);
```

- ``number1`` | Minimum number value. ``number``.
- ``number2`` | Maximum number value. ``number``.

## Examples
```js
// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

const MyRandomNumber = ObamaEngine.RandomBetween(10, 50);
// Returns a random number between 10 and 50.
```