import { RenderObject } from "../renderer/canvas.js";
import { Debug } from "./logger.js";

export const EasingFunctions = {
    linear: function (t) {
        return t
    },
    easeInQuad: function (t) {
        return t * t
    },
    easeOutQuad: function (t) {
        return t * (2 - t)
    },
    easeInOutQuad: function (t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    easeInCubic: function (t) {
        return t * t * t
    },
    easeOutCubic: function (t) {
        return (--t) * t * t + 1
    },
    easeInOutCubic: function (t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart: function (t) {
        return t * t * t * t
    },
    easeOutQuart: function (t) {
        return 1 - (--t) * t * t * t
    },
    easeInOutQuart: function (t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    easeInQuint: function (t) {
        return t * t * t * t * t
    },
    easeOutQuint: function (t) {
        return 1 + (--t) * t * t * t * t
    },
    easeInOutQuint: function (t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
}

/**
 * Animates an object.
 * @param {RenderObject} object RenderObject.
 * @param {any} property Object property.
 * @param {number} startValue Start property value.
 * @param {number} endValue End property value.
 * @param {"linear" | "ease-out" | "ease-in-out"} easingType Animation easing type.
 * @param {number} animationSpeed Animation speed.
 */
export function pt_animate(object, property, startValue, endValue, easingType, animationSpeed) {

    // Check if arguments arent defined.
    for (let i = 0; i < arguments.length; i++) {

        let arg = arguments[i];

        if (typeof arg == "undefined") {
            Debug.Error("undefined argument", "One of the arguments is not defined.");

            return;
        }
    }

    // Continue if all the arguments are filled in.

    // Check if object parameter is a render object
    if (object instanceof RenderObject) {

        let finalPosition = endValue;
        let time = 0;
        let currentPosition = startValue;

        function update() {
            switch (easingType) {
                case "ease-out":
                    if (endValue > startValue) {
                        currentPosition = EasingFunctions.easeInOutQuad(time) * finalPosition;

                        object[property] = startValue + currentPosition;

                        if (time < 1) {

                            time += animationSpeed;

                            window.requestAnimationFrame(update);
                        }
                    } else {
                        currentPosition = EasingFunctions.easeInOutQuad(time) * finalPosition;

                        object[property] = startValue - currentPosition;

                        if (time < 1) {

                            time += animationSpeed;

                            window.requestAnimationFrame(update);
                        }
                    }
                    break;
                case "linear":
                    currentPosition -= 2;

                    object[property] = currentPosition;

                    if (time < 1) {
                        time += animationSpeed;

                        window.requestAnimationFrame(update);
                    }
                    break;
            }
        }

        update();

    } else {
        Debug.Error("unexpected instance", "The given argument (as object) is not a RenderObject instance.");

        return;
    }
}

export function pt_rgbcolor_animator(startValue, endValue, easingType, duration) {

}