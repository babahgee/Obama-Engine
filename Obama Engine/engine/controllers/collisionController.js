import { Debug } from "../essentials/logger.js";
import { GenerateUniqueID, globalContext } from "../main.js";
import { RenderObject } from "../renderer/canvas.js";
import { CheckForVelocityController } from "./controllerEssentials.js";
import { pt_controller_velocity } from "./velocityController.js";

const collisionControllers = [];

/**
 * Rect interesect
 * @param {number} x1
 * @param {number} y1
 * @param {number} w1
 * @param {number} h1
 * @param {number} x2
 * @param {number} y2
 * @param {number} w2
 * @param {number} h2
 */
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        return false;
    }
    return true;
}

export class pt_controllers_collision {
    /**Creates a new collision controller */
    constructor() {

        // Collision booleans.
        this.collisionLeft = false;
        this.collisionTop = false;
        this.collisionRight = false;
        this.collisionBottom = false;

        // If this static property is set to true, the applied render object won't move from it's position.
        this.static = false;

        // Collides objects to left and right sides of the render object.
        this.leftAndRightCollision = true;

        // Collides objects to top and bottom sides of the render object.
        this.topAndBottomCollision = true;

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

                // Checks if the provided render object has a velocity controller.
                let foundVelocityController = CheckForVelocityController(renderObject);

                // If the provided render object has no velocity controller.
                if (!foundVelocityController) {
                    Debug.Error("no velocity controller", "The provided render object has no velocity controller at all.", "Apply a velocity controller to the provided render object.");
                    return;
                }

                // Define the provided render object to this controller.
                this.rObject = renderObject;

                // Pushes current controller to array of updaters in the provided render object.
                renderObject.updaters.push(this);

                // Applies current controller to the provided render object.
                renderObject.collisionController = this;

                // Pushes current controller to global array of collision controllers.
                collisionControllers.push(this);


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
        // If the array of global controllers is more than 0
        if (collisionControllers.length > 0) {

            let i = 0;

            // If the applied render object to this controller is able to render, start executing the following code.
            if (this.rObject.canDraw) {

                // Loop through the global array of collision controllers.
                while (i < collisionControllers.length) {

                    // Define the looped controller.
                    /**@type {pt_controllers_collision} */
                    let controller = collisionControllers[i];

                    // If the ID of the looped controller matches with ID of the current controller, don't execute the code after.
                    if (controller.id == this.id) return;

                    // Define the render object of the looped controller, each controller has a render object.
                    let collidingObject = controller.rObject;

                    // Checks if the colliding objects actually collides with the current applied render object.
                    if (rectIntersect(this.rObject.x, this.rObject.y, this.rObject.width, this.rObject.height, collidingObject.x, collidingObject.y, collidingObject.width, collidingObject.height)) {

                        // Define the center coordinates of the colliding render object.
                        let collidingObjectCenterX = collidingObject.x + (collidingObject.width / 2);
                        let collidingObjectCenterY = collidingObject.y + (collidingObject.height / 2);

                        // Define the center coordinates of the applied render object.
                        let currentObjectCenterX = this.rObject.x + (this.rObject.width / 2);
                        let currentObjectCenterY = this.rObject.y + (this.rObject.width / 2);

                        // Some epic vector thingies.
                        let vectorX = currentObjectCenterX - collidingObjectCenterX;
                        let vectorY = currentObjectCenterY - collidingObjectCenterY;

                        // If the current controller is static.
                        if (this.static) {

                            // Some Maths thingies.
                            if (vectorY * vectorY > vectorX * vectorX) {
                                if (this.topAndBottomCollision) {
                                    if (vectorY > 0) {
                                        // Collision top.

                                        this.collisionTop = true;
                                        this.collisionBottom = false;

                                        controller.collisionTop = false;
                                        controller.collisionBottom = true;

                                        collidingObject.y = this.rObject.y - collidingObject.height;
                                        collidingObject.velocityController.velY = 0;
                                    } else {
                                        // Collision bottom

                                        this.collisionTop = false;
                                        this.collisionBottom = true;

                                        controller.collisionTop = true;
                                        controller.collisionBottom = true;

                                        collidingObject.y = this.rObject.y + this.rObject.height;
                                        collidingObject.velocityController.velY = 0;
                                    }
                                }

                            } else {
                                if (this.leftAndRightCollision) {
                                    if (vectorX > 0) {
                                        // Collision right.

                                        collidingObject.x = this.rObject.x - collidingObject.width;
                                        collidingObject.velocityController.velX = 0;
                                    } else {
                                        // Collision left.

                                        collidingObject.x = this.rObject.x + this.rObject.width;
                                        collidingObject.velocityController.velY = 0;
                                    }
                                }
                            }
                        } else {
                            // If the current controller is not static.

                            if (vectorY * vectorY > vectorX * vectorX) {
                                if (vectorY > 0) {
                                    // Collision top.

                                    this.rObject.y = collidingObject.y + collidingObject.height;
                                    collidingObject.velocityController.velX = this.rObject.velocityController.velX;
                                } else {
                                    // Collision bottom.

                                    this.rObject.y = collidingObject.y - this.rObject.height;
                                    collidingObject.velocityController.velX = this.rObject.velocityController.velX;
                                }
                            } else {
                                if (vectorX > 0) {
                                    // Collision right.

                                    this.rObject.x = collidingObject.x + collidingObject.width;
                                    collidingObject.velocityController.velY = this.rObject.velocityController.velY;
                                } else {
                                    // Collision left.

                                    this.rObject.x = collidingObject.x - this.rObject.width;
                                    collidingObject.velocityController.velY = this.rObject.velocityController.velY;
                                }
                            }
                        }
                    }
                    if (!rectIntersect(this.rObject.x, this.rObject.y, this.rObject.width, this.rObject.height, collidingObject.x, collidingObject.y, collidingObject.width, collidingObject.height)) {
                        this.collisionBottom = false;
                        this.collisionTop = false;
                        this.collisionLeft = false;
                        this.collisionRight = false;

                        controller.collisionBottom = false;
                        controller.collisionTop = false;
                        controller.collisionLeft = false;
                        controller.collisionRight = false;
                    }


                    i += 1;
                }
                
            }

        }
    }
}