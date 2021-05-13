import { Debug } from "../essentials/logger.js";
import { GenerateUniqueID } from "../main.js";
import { RenderObject } from "../renderer/canvas.js";
import { pt_controller_velocity } from "./velocityController.js";

const collisionController = [];

export class pt_controllers_collision {
    constructor() {
        this.collisionLeft = false;
        this.collisionTop = false;
        this.collisionRight = false;
        this.collisionBotom = false;

        this.rObject = null;
        this.id = GenerateUniqueID(18);
    }
    /**
     * Applies collision controller to render object.
     * @param {RenderObject} renderObject
     */
    ApplyTo(renderObject) {
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {

                let hasVelocityController = false;

                // Check in the list of updaters in the render object instance to see if it has a velocity controller.
                let i = 0;

                while (i < renderObject.updaters.length) {

                    let updater = renderObject.updaters[i];

                    if (updater instanceof pt_controller_velocity) {
                        hasVelocityController = true;
                    }

                    i += 1;
                }

                if (hasVelocityController) {
                    this.rObject = renderObject;

                    renderObject.updaters.push(this);
                    collisionController.push(this);
                } else {

                    Debug.Error("no velocity controller", "The provided render object has no velocity controller at all.", "Apply a velocity controller to the provided render object.");

                    return;
                }

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
    Update() {

    }
}