// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";
import { Player } from "./player.js";

const PlayerSpriteSheet = await ObamaEngine.LoadImageSync("../engine/nativeResources/spritesheets/spritesheet-obunga-01.png");

export const PlayerSpriteSheetController = new ObamaEngine.SpriteSheetController(PlayerSpriteSheet);

PlayerSpriteSheetController.spriteLengthX = 25;
PlayerSpriteSheetController.spriteLengthY = 1;

const sprites = PlayerSpriteSheetController.Cut();

export function LoadSprite() {
    Player.SetRenderImage(sprites[3]);

    Player.width = PlayerSpriteSheetController.frameWidth;
    Player.height = PlayerSpriteSheetController.frameHeight;
}