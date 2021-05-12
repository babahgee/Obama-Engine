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
    Update() {

        if (this.velX > this.forceStrength) {
            this.velX -= this.forceStrength;

        }
        if (this.velX < 0) {
            this.velX += this.forceStrength;
        }

        if (this.velY > this.forceStrength) {
            this.velY -= this.forceStrength;
        }
        if (this.velY < 0) {
            this.velY += this.forceStrength;
        }

        this.rObject.x += this.velX;
        this.rObject.y += this.velY;
    }
}