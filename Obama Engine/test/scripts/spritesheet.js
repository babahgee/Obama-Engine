// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";
import { Player } from "./player.js";

const PlayerSpriteSheet = await ObamaEngine.LoadImageSync("../engine/nativeResources/spritesheets/spritesheet-obunga-02.png");

export const PlayerSpriteSheetController = new ObamaEngine.SpriteSheetController(PlayerSpriteSheet);

PlayerSpriteSheetController.spriteLengthX = 25;
PlayerSpriteSheetController.spriteLengthY = 1;

const sprites = PlayerSpriteSheetController.Cut();

export function LoadSprite() {
    Player.width = PlayerSpriteSheetController.frameWidth;
    Player.height = PlayerSpriteSheetController.frameHeight;

    const Animator = new ObamaEngine.SpriteSheetAnimator(sprites);

    Animator.CreateAnimationSet("standing", 0, 1);
    Animator.CreateAnimationSet("walking-to-right", 1, 11);
    Animator.CreateAnimationSet("walking-to-left", 12, 22);

    Animator.SetAnimation("standing");

    Animator.loop = true
    Animator.updateSpeed = 1;

    Animator.ApplyTo(Player);

    return Animator;
}