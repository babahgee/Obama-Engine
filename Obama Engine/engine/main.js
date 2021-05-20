/*
 * Obama Engine 0.1
 * Rohan Kanhaisingh, aka Babah Gee.
 * 
 */

// Import renderer things.
import * as pt_renderer_canvas from "./renderer/canvas.js";
import * as pt_renderer_camera from "./renderer/camera.js";

// Import essentials.
import * as pt_essentials_animator from "./essentials/animator.js";
import * as pt_dataloader from "./essentials/dataloader.js";
import { pt_essentials_svgfilter } from "./essentials/svgfilter.js";
import { Debug } from "./essentials/logger.js";
import { pt_essentials_spritesheetcontroller } from "./essentials/spritesheet.js";

// Import controllers.
import { pt_controller_velocity } from "./controllers/velocityController.js";
import { pt_controllers_raycast } from "./controllers/rayCastController.js";
import { pt_controllers_collision } from "./controllers/collisionController.js";
import { pt_controllers_gravity } from "./controllers/gravityController.js";

// Import shapes.
import * as pt_objects_rectangle from "./objects/rectangle.js";

// Initialize everything before exporting things.
function AutoInitialize() {

    // Logging auto initialize states.
    Debug.Log("obama engine", "Intializing browser...", "yellow");

    // Check if the await and async keywords are supported.

    let supportsAwait = false;
    let supportsAsync = false;

    // Check support for async keyword.
    try {
        eval("async () => {}");
    } catch (e) {
        if (e instanceof SyntaxError) {
            supportsAsync = false;

            Debug.Log("obama engine", "This browser does not support the 'async' keyword. Be aware that some features may now work.", "yellow");
        }
    }

    // Check support for await keyword.
    try {
        eval(" await ");
    } catch (e) {
        if (e instanceof SyntaxError) {
            supportsAwait = false;

            Debug.Log("obama engine", "This browser does not support the 'await' keyword. Be aware that some features may not work.", "yellow");
        }
    }

    // Check if document object exists.
    if (!(document && typeof document == "object")) {
        console.error("The document object does not exist. Please use Obama Engine on web browsers only.");

        if (typeof process == "object") {
            if (typeof process.exit == "function") {
                process.exit();
            }
        }
    }

    // Check browser version.
    if (typeof navigator == "object") {
        if (typeof navigator.appVersion == "string") {

            let version = navigator.appVersion,
                supportedVersion = [85, 86, 87, 88, 89, 90],
                supportsEngine = false;

            if (version.includes("Chrome")) {
                let chromeFilter = version.substring(version.indexOf("Chrome")).split(" ")[0].split("/")[1];

                chromeFilter = parseInt(chromeFilter);

                for (let i = 0; i < supportedVersion.length; i++) {
                    if (supportedVersion[i] == chromeFilter) {
                        supportsEngine = true;
                    }
                }

                if (supportsEngine) {

                    console.log("%c ", "width: 120px; height: 120px; padding: 60px; background: url(https://yt3.ggpht.com/ytc/AAUvwnjr4YBPP-xXTWAoD2nPmWtp2zEcgEB5MRM-GHCs=s900-c-k-c0x00ffffff-no-rj); background-size: 120px 120px; background-repeat: no-repeat;");
                    Debug.Log("obama engine", "This browser supports this game engine. :)", "cyan");
                }
            } else {
                Debug.Log("obama engine", "This browser may not support this game engine. Chrome version 85+ is recommended.", "yellow");
            }
        }
    } else {
        Debug.Log("obama engine", "The browser does not have a navigator object, it may not support it. Be aware that some features may not work.", "yellow");
    }
}

AutoInitialize();

/**@type {CanvasRenderingContext2D} */
export let globalContext;

/**@type {HTMLCanvasElement} */
export let globalCanvas;

/**
 * Set a canvas renderer to a global variable.
 * @param {pt_renderer_canvas.pt_renderer_canvas} canvasRenderInstance
 */
export function SetGlobalCanvasRenderer(canvasRenderInstance) {
    if (typeof canvasRenderInstance !== "undefined") {
        if (canvasRenderInstance instanceof pt_renderer_canvas.pt_renderer_canvas) {

            if (typeof globalContext == "undefined" && typeof globalContext == "undefined") {
                globalContext = canvasRenderInstance.ctx;
                globalCanvas = canvasRenderInstance.element;

                const exports = {
                    globalContext: globalContext,
                    globalCanvas: globalCanvas,
                    globalCanvasRenderer: canvasRenderInstance
                };

                for (let variable in exports) {
                    window[variable] = exports[variable];
                } 
            } else {
                Debug.Error("already defined variables", "The globalContext and globalCanvas variables already has been defined for this canvas renderer instance.");
            }

        } else {
            Debug.Error("unexpected instance", "The given argument (as canvasRenderInstance) is not a Canvas Renderer instance");
        }
    } else {
        Debug.Error("undefined argument", "The required argument has not been defined.");

        return;
    }
}

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
/**
 * UniqueID
 * @param {number} length
 */
export function GenerateUniqueID(length) {
    var a, b, c, d, e, f;
    a = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    b = "";
    if (length !== undefined) {
        for (var i = 0; i < length; i++) {
            c = Math.floor(Math.random() * a.length);
            d = a.charAt(c);
            b += d;
        }
    } else {
        for (var i = 0; i < 12; i++) {
            c = Math.floor(Math.random() * a.length);
            d = a.charAt(c);
            b += d;
        }
    }
    return b;
}

const keyPressEvents = {}, keyUpdaters = [];

window.addEventListener("keydown", event => {
    if (typeof keyPressEvents[event.keyCode] == "function") {
        keyPressEvents[event.keyCode]();
    }

    let i = 0;

    while (i < keyUpdaters.length) {

        let updater = keyUpdaters[i];

        updater.ChangeKeyState(event.keyCode, true);

        i += 1;
    }
});

window.addEventListener("keyup", event => {
    if (typeof keyPressEvents[event.keyCode] == "function") {
        keyPressEvents[event.keyCode]();
    }

    let i = 0;

    while (i < keyUpdaters.length) {

        let updater = keyUpdaters[i];

        updater.ChangeKeyState(event.keyCode, false);
        
        i += 1;
    }
});

export class WASDSpaceKeyUpdater {
    constructor(listener) {

        // Check if the argument is a function.
        if (typeof listener !== "function") {
            Debug.Error("invalid argument", "The required argument is not a function.");

            return;
        }

        this.listener = listener;

        this.pressedKey = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        }

        this.Update();

        keyUpdaters.push(this);
    }
    /**
     * Changes pressed key states.
     * @param {number} keyCode
     * @param {boolean} state
     */
    ChangeKeyState(keyCode, state) {
        switch (keyCode) {
            case 87:
                this.pressedKey.w = state;
                break;
            case 65:
                this.pressedKey.a = state;
                break;
            case 83:
                this.pressedKey.s = state;
                break;
            case 68:
                this.pressedKey.d = state;
                break;
            case 32:
                this.pressedKey.space = state;
                break;
        }
    }
    /**Updates listener */
    Update() {
        window.requestAnimationFrame(() => {
            this.Update();
        });

        this.listener(this.pressedKey);
    }
    /**Destroys instance. */
    Destroy() {
        let i = 0;

        while (i < keyUpdaters.length) {

            let updater = keyUpdaters[i];

            if (updater.id == this.id) {
                keyUpdaters.splice(i, 1);

                return true;
            }

            i += 1;
        }
    }
}

/**
 * Listens for pressed keyboard key.
 * @param {number} keyCode
 * @param {Function} listener
 */
export function ListenForKey(keyCode, listener) {
    if (typeof keyCode == "number") {
        if (typeof listener == "function") {
            keyPressEvents[keyCode] = listener;
        } else {
            Debug.Error("invalid argument", "The required argument (as listener) has to be a function.");
        }
    } else {
        Debug.Error("invalid argument", "The required argument (as keyCode) has to be a number.");
    }
}


/* Export constants variables */

// Export renderer tools.
export const Canvas = pt_renderer_canvas.pt_renderer_canvas;
export const Camera = pt_renderer_camera.pt_renderer_camera;

// Export controllers.
export const GravityController = pt_controllers_gravity;
export const RayCastController = pt_controllers_raycast;
export const CollisionController = pt_controllers_collision;
export const VelocityController = pt_controller_velocity;

// Export essentials.
export const SVGFilter = pt_essentials_svgfilter;
export const LoadImageSync = pt_dataloader.pt_loadImageSync; 
export const Animate = pt_essentials_animator.pt_animate;
export const SpriteSheetController = pt_essentials_spritesheetcontroller;

// Export shapes.
export const Rectangle = pt_objects_rectangle.pt_objects_rectangle;

// Export global thingies.
export const GlobalDebug = Debug;