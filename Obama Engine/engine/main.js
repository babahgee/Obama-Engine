/*
 * Obama Engine 0.1
 * Rohan Kanhaisingh, aka Babah Gee.
 * 
 */

import { Debug } from "./essentials/logger.js";
import * as pt_renderer_canvas from "./renderer/canvas.js";
import * as pt_renderer_camera from "./renderer/camera.js";
import * as pt_objects_rectangle from "./objects/rectangle.js";

export let globalContext, globalCanvas;

/**
 * Returns a random number between 2 values.
 * @param {number} min
 * @param {number} max
 */
export function RandomBetween(number1, number2) {
    if (typeof number1 == "number" && typeof number2 == "number") {
        let randomNumber = Math.floor(Math.random() * (number2 - number1 + 1) + number1);

        return randomNumber;
    } else {

        let solution = "";

        if (typeof number1 !== "number") solution += `Replace the value '${number1}' (which is a ${typeof number1}) as 'number1', to a number.`;
        if (typeof number2 !== "number") solution += `Replace the value '${number2}' (which is a ${typeof number2}) as 'number2', to a number.`;

        Debug.Error("invalid value", "The required arguments must be a number.", solution);

        return;
    }
}

export const Canvas = pt_renderer_canvas.pt_renderer_canvas;
export const Camera = pt_renderer_camera.pt_renderer_camera;
export const Rectangle = pt_objects_rectangle.pt_objects_rectangle;