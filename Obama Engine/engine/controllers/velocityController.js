import { Debug } from "../essentials/logger.js";
import { GenerateUniqueID } from "../main.js";
import { RenderObject } from "../renderer/canvas.js";

export class pt_controller_velocity {
    constructor() {
        this.velX = 0;
        this.velY = 0;
        this.forceStrength = 1;

        this.acceleration = false;
        this.accelerationSpeed = 1;

        this.rObject = null;
        this.id = GenerateUniqueID(18);
    }
    /**
     * Applies velocity controller to render object.
     * @param {RenderObject} renderObject
     */
    ApplyTo(renderObject) {
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {
                this.rObject = renderObject;

                renderObject.velocityController = this;
                renderObject.updaters.push(this);

                return this;
            } else {
                Debug.Error("unexpected instance", "The given argument (as renderObject) is not a RenderObject instance.", "Enter a RenderObject value.");
                return;
            }
        } else {
            Debug.Error("undefined argument", "The required argument has to be a RenderObject instance.");
            return;
        }
    }
    /**
     * Adds a velocity force to this instance.
     * @param {number | null} x
     * @param {number | null} y
     * @param {number} forceStrength
     */
    AddForce(x, y, forceStrength) {
        if (typeof this.rObject !== "undefined") {
            this.velX = x || null;
            this.velY = y || null;
            this.forceStrength = forceStrength || null;

            return this;
        } else {
            Debug.Error("unapplied instance", "There has no RenderObject instance applied to this controller.", "Apply a RenderObject instance to this controller");
        }
    }
    Destroy() {
        let i = 0;

        while (i < this.rObject.updaters.length) {

            let updater = this.rObject.updaters[i];

            if (updater.id == this.id) {
                this.rObject.updaters.splice(i, 1);

                return true;
            }

            i += 1;
        }
    }
    /**
     * Accelerate this controller.
     * @param {number} velocityX
     * @param {number} velocityY
     */
    Accelerate(velocityX, velocityY) {

        // If the velocityX argument is a number.
        if (typeof velocityX == "number") {
            if (velocityX > 0) {
                if (this.velX < velocityX) {
                    this.velX += this.accelerationSpeed;
                } else {
                    this.velX = velocityX;
                }
            } else {
                if (this.velX > velocityX) {
                    this.velX -= this.accelerationSpeed;
                } else {
                    this.velX = velocityX;
                }
            }
        }

        // If the velocityY argument is a number.
        if (typeof velocityY == "number") {
            if (velocityY > 0) {
                if (this.velY < velocityY) {
                    this.velY += this.accelerationSpeed;
                } else {
                    this.velY = this.velY;
                }
            } else {
                if (this.velY > velocityY) {
                    this.velY -= this.accelerationSpeed;
                } else {
                    this.velY = velocityY;
                }
            }
        }
    }
    Update() {

        if (this.velX > 0) {
            this.velX -= this.forceStrength;
        }
        if (this.velX < 0) {
            this.velX += this.forceStrength;
        }

        if (this.velY > 0) {
            this.velY -= this.forceStrength;
        }
        if (this.velY < 0) {
            this.velY += this.forceStrength;
        }

        this.rObject.x += this.velX;
        this.rObject.y += this.velY;
    }
}