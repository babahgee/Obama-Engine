import { Debug } from "../essentials/logger.js";
import { GenerateUniqueID } from "../main.js";
import { RenderObject } from "../renderer/canvas.js";

import { CheckForVelocityController } from "./controllerEssentials.js";

const gravityControllers = [];


export class pt_controllers_gravity {
    /**Creates a gravity controller */
    constructor() {
        this.gravityForce = 1;
        this.rObject;

        this.velX = 0;
        this.velY = 0;

        this.collisionController;
        this.velocityController;

        this.id = GenerateUniqueID(18);
    }
    /**
     * Applies this controller to a render object.
     * @param {RenderObject} renderObject
     */
    ApplyTo(renderObject) {
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {

                // Check if the provided render object has a velocity and a collision controller.
                let foundVelocityController = CheckForVelocityController(renderObject),
                    foundCollisionController = CheckForVelocityController(renderObject);

                // If one of the found controllers are undefined, stop the execution and throw an error.
                if (!foundCollisionController || !foundVelocityController) {

                    Debug.Error("no velocity controller", "The provided render object has no velocity or a collision controller at all.", "Apply a velocity or a collision controller to the provided render object.");

                    return;
                }

                // Define provided renderobject to current controller instance.
                this.rObject = renderObject;

                // Define found velocity and collision controller to current controller instance.
                this.velController = foundVelocityController; 
                this.collisionController = foundCollisionController;

                // Applies current controller instance to provided render object.
                renderObject.gravityControler = this;

                // Pushes current controller instance to the array of updaters in the provided render object.
                renderObject.updaters.push(this);

                // Push the current controller instance to the global array of gravity controllers.
                gravityControllers.push(this);

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
        this.velController.velY += 1;
    }
}