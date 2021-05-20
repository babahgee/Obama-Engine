// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";

const PlayerSpriteSheet = await ObamaEngine.LoadImageSync("../engine/nativeResources/spritesheets/spritesheet-obunga-01.png");

export const PlayerSpriteSheetController = new ObamaEngine.SpriteSheetController(PlayerSpriteSheet);