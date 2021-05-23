// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";
import { Player } from "./player.js";

const PlayerSpriteSheet = await ObamaEngine.LoadImageSync("../engine/nativeResources/spritesheets/spritesheet-obunga-01.png");

export const PlayerSpriteSheetController = new ObamaEngine.SpriteSheetController(PlayerSpriteSheet);


PlayerSpriteSheetController.spriteLengthX = 25;
PlayerSpriteSheetController.spriteLengthY = 1;

const sprites = PlayerSpriteSheetController.Cut();

export function LoadSprite() {
    Player.width = PlayerSpriteSheetController.frameWidth;
    Player.height = PlayerSpriteSheetController.frameHeight;

    const Animator = new ObamaEngine.SpriteSheetAnimator(sprites);

    Animator.CreateAnimationSet("walking-to-left", 1, 11);

    Animator.SetAnimation("walking-to-left");

    Animator.loop = true
    Animator.updateSpeed = 0;

    Animator.ApplyTo(Player);
}