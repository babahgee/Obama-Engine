// Import Obama Engine.
import * as ObamaEngine from "../../engine/main.js";

// Import exports from custom modules
import { Camera, Renderer } from "./main.js";
import { Dababy } from "./assets.js";
import { PlayerSpriteSheetController } from "./spritesheet.js";
import { Player } from "./player.js";

let shootInterval = 0;

const pd = function (x1, y1, x2, y2) {
    var x1, y1, x2, y2, a, b;

    a = Math.atan2(y2 - y1, x2 - x1);

    return {
        x: Math.cos(a),
        y: Math.sin(a)
    }
}

export function Shoot() {
    function updater() {
        if (Renderer.mouse.buttons.left) {

            if (shootInterval < 5) {
                shootInterval += 1;
            } else {

                shootInterval = 0;

                let Bullet = new ObamaEngine.Rectangle(Player.x + Player.width + 10, Player.y, ObamaEngine.RandomBetween(10, 100), ObamaEngine.RandomBetween(10, 100), {
                    backgroundColor: [0, 0, 0],
                    blurColor: [0, 0, 0],
                    blurStrength: 50
                }).ApplyTo(Renderer);

                let BulletVelocityController = new ObamaEngine.VelocityController().ApplyTo(Bullet);
                let BulletCollisionController = new ObamaEngine.CollisionController().ApplyTo(Bullet).static = false;
              
                BulletVelocityController.velX = pd(Player.x, Player.y, Renderer.mouse.x, Renderer.mouse.y).x * 40;
                BulletVelocityController.velY = pd(Player.x, Player.y, Renderer.mouse.x, Renderer.mouse.y).y * 40;

                let shootsound = new Audio();
                shootsound.src = "../engine/nativeResources/audio/minigun_round_shoot.wav";
                shootsound.play();


                setTimeout(function () {
                    Renderer.Destroy(Bullet);
                }, 10000);
            }
        }

        window.requestAnimationFrame(updater);
    }

    updater();
}