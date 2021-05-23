import { GenerateUniqueID } from "../main.js";
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

export class pt_spritesheet_animator {
    /**
     * Animates spritesheets.
     * @param {Array} spritesheetArray
     */
    constructor(spritesheetArray) {
        this.spriteSheetSet = spritesheetArray;

        this.id = GenerateUniqueID(18);
        this.creationTimeStamp = Date.now();

        this.animationSets = {};
        this.selectedAnimationSet = spritesheetArray;

        this.loop = false;
        this.hasAnimated = false;

        this.tick = 0;
        this.updateSpeed = 1;

        this.appliedRenderObject = null;

        this.frameX = 0;
    }
    /**
     * Create a animation set.
     * @param {string} animationName
     * @param {number} spriteIndexStart
     * @param {number} spriteIndexEnd
     */
    CreateAnimationSet(animationName, spriteIndexStart, spriteIndexEnd) {

        // Check if the arguments are all passed.
        for (let arg in arguments) {
            if (typeof arg == "undefined") {

                Debug.Error("undefined argument", "One of the required arguments is not defined.", "Define all the required arguments.");

                this.Destroy();

                return;
            }
        }

        // Continue of no error has been occurred.
        
        // Check if the first argument is a string.
        if (typeof animationName == "string") {

            // Check if both spriteIndexStart and spriteIndexEnd are numbers.
            if (typeof spriteIndexStart !== "number" || typeof spriteIndexStart !== "number") {

                Debug.Error("unexpected argument", "One of the required arguments (as spriteIndexStart or spriteIndexEnd) is not a number");
                return;
            }

            // Continue of no error has been occurred.

            // Check if the spriteIndexEnd is larger than the size of the set with sprites
            if (spriteIndexEnd < this.spriteSheetSet.length + 1) {

                // Start frame indexer.
                let frame = spriteIndexStart;

                let providedFrames = [];

                // Loop until the end of the provided sprite index length.
                while (frame < spriteIndexEnd) {

                    providedFrames.push(this.spriteSheetSet[frame]);

                    frame += 1;
                }

                this.animationSets[animationName] = providedFrames;

                return this.animationSets[animationName];
            } else{
                Debug.Error("out of index", "The given value as spriteIndexEnd is larger than the actual set of given sprites.", `Give a value below ${this.spriteSheetSet.length}. Given value: ${spriteIndexEnd}`);
            }

        } else {
            Debug.Error("unexpected argument", "The required argument (as animationName), has to be a string.", "Enter a string value.");
        }

    }
    /**
     * Starts animating.
     * @param {string} animationName
     */
    SetAnimation(animationName) {

        // Check if the given argument is a string type.
        if (typeof animationName == "string") {

            // Check if the provided animation exist in the set of animations.
            if (typeof this.animationSets[animationName] !== "undefined") {

                this.selectedAnimationSet = this.animationSets[animationName];

            } else {
                // Get the names of animations.

                let animationNames = "";

                for (let animation in this.animationSets) {

                    let frameLength = this.animationSets[animation].length;

                    animationNames += `- "${animation}" - contains ${frameLength} frames.\n`;
                }

                Debug.Error("unexisting animation-set", "The provided animation does not exist in the set of animations for in this Animator instance.", `Choose any of the following animations: \n\n${animationNames}`);
            }

        } else {
            Debug.Error("unexpected argument", "The required argument (as animationName) is not a string.");
        }
     }
    Update() {
        if (this.appliedRenderObject !== null) {
            if (!this.loop) {
                if (!this.hasAnimated) {
                    if (this.tick < this.updateSpeed) {
                        this.tick += 1;
                    } else {
                        this.tick = 0;

                        if (this.frameX < this.selectedAnimationSet.length) {


                            this.appliedRenderObject.SetRenderImage(this.selectedAnimationSet[this.frameX]);


                            this.frameX += 1;
                        } else {
                            this.frameX = 0;
                            this.hasAnimated = true;

                        }
                    }
                }
            } else {
                if (this.tick < this.updateSpeed) {
                    this.tick += 1;
                } else {
                    this.tick = 0;

                    if (this.frameX < this.selectedAnimationSet.length) {


                        this.appliedRenderObject.SetRenderImage(this.selectedAnimationSet[this.frameX]);


                        this.frameX += 1;
                    } else {
                        this.frameX = 0;
                        this.hasAnimated = true;

                    }
                }
            }
        } else {
            Debug.Error("unapplied render object", "There has no render object been applied to this animator.", "Apply a render object in order to continue animating.");
            return;
        }

    }
    Destroy() {
        if (this.appliedRenderObject !== null) {
            /**@type {RenderObject} */
            let renderObject = this.appliedRenderObject;

            let i = 0;

            // Loop through the array of updaters.
            while (i < renderObject.updaters.length) {

                let updater = renderObject.updaters[i];

                if (updater.id == this.id && updater.creationTimeStamp == this.creationTimeStamp) {
                    renderObject.updaters.splice(i, 1);

                    return true;
                }

                i += 1;
            }
        }
    }

    /**
     * Applies this SpritesheetAnimator instance to a Render Object.
     * @param {RenderObject} renderObject
     */
    ApplyTo(renderObject) {

        // Check if the required argument is not defined and is a instance of RenderObject.
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {

                // Define provided renderobject to current animator instance.
                this.appliedRenderObject = renderObject;

                // Pushes current controller instance to the array of updaters in the provided render object.
                renderObject.updaters.push(this);
                return this;
            } else {
                Debug.Error("unexpected instance", "The given argument (as renderObject) is not a RenderObject instance.", "Enter a RenderObject value.");
                return;
            }
        }
    }
}