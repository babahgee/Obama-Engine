import { RenderObject } from "../renderer/canvas.js";

// Usable controllers.
import { pt_controllers_collision } from "./collisionController.js";
import { pt_controllers_gravity } from "./gravityController.js";
import { pt_controller_velocity } from "./velocityController.js";

/**
 * Checks if the provided render object has a velocity controller.
 * @param {RenderObject} renderObject
 */
export function CheckForVelocityController(renderObject) {

    let hasVelocityController = false, foundVelocityController, i = 0;

    // Loop through list of updaters of the provided render object.
    while (i < renderObject.updaters.length) {

        // Define the looped updater.
        let updater = renderObject.updaters[i];

        // Check if the updater is a instance of 'pt_controller_velocity'.
        if (updater instanceof pt_controller_velocity) {

            hasVelocityController = true;

            foundVelocityController = updater;
        }

        i += 1;
    }

    // Return the found controller, it will be either undefined or a controller instance.
    return foundVelocityController;
}

/**
 * Checks if the provided render object has a collision controller.
 * @param {RenderObject} renderObject
 */
export function CheckForCollisionController(renderObject) {

    let hasCollisionController = false, foundCollisionController, i = 0;

     // Loop through list of updaters of the provided render object.
    while (i < renderObject.updaters.length) {

        // Define the looped updater.
        let updater = renderObject.updaters[i];

        // Check if the updater is a instance of 'pt_controller_velocity'.
        if (updater instanceof pt_controllers_collision) {
            hasCollisionController = true;

            foundCollisionController = updater;
        } 

        i += 1;
    }

    // Return the found controller, it will be either undefined or a controller instance.
    return foundCollisionController;
}