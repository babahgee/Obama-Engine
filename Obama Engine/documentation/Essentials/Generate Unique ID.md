# Generate Unique ID
```ts
string function GenerateUnqiueID;
```

- - -

## Intro
The 'GenerateUniqueID' function returns a string with unique random letters, numbers and cymbols forming an ``unique ID``.
This function is mostly being used for ``Render Objects``.

## Required arguments
```js
ObamaEngine.GenerateUniqueID(length | null);
```

For this function, it is optional to enter an argument. Calling this function without an argument returns a 
string with a length of 12 characters.

- ``length`` | Length of the provided unique ID. ``number``.

## Examples
```js
// Import Obama Engine.
import * as ObamaEngine from "./engine/main.js";

const MyFirstEpicID = ObamaEngine.GenerateUniqueID(18);
// Returns a unique id with 18 characters.

const MySecondEpicID = ObamaEngine.GenerateUniqueID();
// Returns a unique id with 12 characters.
```