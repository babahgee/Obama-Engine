import { Debug } from "../essentials/logger.js";
import { GenerateUniqueID, globalContext } from "../main.js";
import { RenderObject } from "../renderer/canvas.js";
import { pt_controller_velocity } from "./velocityController.js";

const collisionControllers = [];

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
        this.collisionLeft = false;
        this.collisionTop = false;
        this.collisionRight = false;
        this.collisionBotom = false;
        this.static = false;

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

                    renderObject.collisionController = this;
                    collisionControllers.push(this);
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
        if (collisionControllers.length > 0) {

            let i = 0;

            if (this.rObject.canDraw) {
                while (i < collisionControllers.length) {

                    let controller = collisionControllers[i];

                    if (controller.id == this.id) return;

                    let collidingObject = controller.rObject;

                    if (rectIntersect(this.rObject.x, this.rObject.y, this.rObject.width, this.rObject.height, collidingObject.x, collidingObject.y, collidingObject.width, collidingObject.height)) {

                        let collidingObjectCenterX = collidingObject.x + (collidingObject.width / 2);
                        let collidingObjectCenterY = collidingObject.y + (collidingObject.height / 2);

                        let currentObjectCenterX = this.rObject.x + (this.rObject.width / 2);
                        let currentObjectCenterY = this.rObject.y + (this.rObject.width / 2);

                        let vectorX = currentObjectCenterX - collidingObjectCenterX;
                        let vectorY = currentObjectCenterY - collidingObjectCenterY;

                        if (this.static) {
                            if (vectorY * vectorY > vectorX * vectorX) {

                                if (vectorY > 0) {

                                    collidingObject.y = this.rObject.y - collidingObject.height;
                                    collidingObject.velocityController.velY = 0;
                                } else {
                                    console.log(true);
                                    collidingObject.y = this.rObject.y + this.rObject.height;
                                    collidingObject.velocityController.velY = 0;
                                }
                            } else {
                                if (vectorX > 0) {
                                    collidingObject.x = this.rObject.x - collidingObject.width;

                                    collidingObject.velocityController.velX = 0;
                                } else {
                                    collidingObject.x = this.rObject.x + this.rObject.width;

                                    collidingObject.velocityController.velY = 0;
                                }
                            }
                        } else {
                            if (vectorY * vectorY > vectorX * vectorX) {

                                if (vectorY > 0) {

                                    this.rObject.y = collidingObject.y + collidingObject.height;

                                    collidingObject.velocityController.velX = this.rObject.velocityController.velX;
                                } else {
                                    this.rObject.y = collidingObject.y - this.rObject.height;
                                    collidingObject.velocityController.velX = this.rObject.velocityController.velX;
                                }
                            } else {
                                if (vectorX > 0) {
                                    this.rObject.x = collidingObject.x + collidingObject.width;
                                    collidingObject.velocityController.velY = this.rObject.velocityController.velY;
                                } else {
                                    this.rObject.x = collidingObject.x - this.rObject.width;
                                    collidingObject.velocityController.velY = this.rObject.velocityController.velY;
                                }
                            }
                        }

                        //globalContext.save();
                        //globalContext.beginPath();
                        //globalContext.moveTo(collidingObjectCenterX, collidingObjectCenterY);
                        //globalContext.lineTo(currentObjectCenterX, currentObjectCenterY);
                        //globalContext.strokeStyle = "red";
                        //globalContext.stroke();
                        //globalContext.restore();
                    }

                    i += 1;
                }
            }

        }
    }
}