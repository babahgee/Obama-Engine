import { pt_controllers_collision } from "../controllers/collisionController.js";
import { EasingFunctions } from "../essentials/animator.js";
import { Debug } from "../essentials/logger.js";
import { GenerateUniqueID } from "../main.js";
import { pt_renderer_camera } from "./camera.js";

export class pt_renderer_canvas {
    /**
     * Creates a new Canvas instance.
     * @param {number} width
     * @param {number} height
     * @param {object} options
     * @param {boolean} options.lockToWindowSize
     * @param {boolean} options.contextMenu
     */
    constructor(width, height, options) {
        let processStart, processEnd, processDifference;

        // Start calculating the process time.
        processStart = Date.now();

        // Logging that the canvas renderer is loading.
        Debug.Log("OBAMA ENGINE", "Initializing canvas renderer...", "yellow");

        this.width = width;
        this.height = height;

        this.renderWidth = null;
        this.renderHeight = null;

        this.options = options;

        this.renderObjects = [];

        this.styles = {
            backgroundColor: undefined
        };

        // Mouse properties.
        this.mouse = {
            x: 0,
            y: 0,
            buttons: {
                left: false,
                middle: false,
                right: false
            }
        }

        // Check if the required arguments are correct.
        if (typeof width !== "number") Debug.Error("invalid type", "The required argument (width) is not a number type.");
        if (typeof height !== "number") Debug.Error("invalid type", "The required argument (height) is not a number type.");

        // Create canvas element.
        let element = document.createElement("canvas");

        // Set the width and height.
        element.width = this.width;
        element.height = this.height;

        // Apply options.
        if (typeof options !== "undefined") {
            if (typeof options["lockToWindowSize"] == "boolean") {
                window.addEventListener("resize", event => {
                    element.width = window.innerWidth;
                    element.height = window.innerHeight;
                });
            }
            if (typeof options["contextMenu"] == "boolean") {
                element.addEventListener("contextmenu", event => {
                    event.preventDefault();

                    return;
                });
            };
        }

        // Mouse events.
        element.addEventListener("mousemove", event => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        element.addEventListener("mousedown", event => {
            switch (event.button) {
                case 0:
                    this.mouse.buttons.left = true;
                    break;
                case 1:
                    this.mouse.buttons.middle = true;
                    break;
                case 2:
                    this.mouse.buttons.right = true;
                    break;
            }
        });

        element.addEventListener("mouseup", event => {
            switch (event.button) {
                case 0:
                    this.mouse.buttons.left = false;
                    break;
                case 1:
                    this.mouse.buttons.middle = false;
                    break;
                case 2:
                    this.mouse.buttons.right = false;
                    break;
            }
        });

        // Other thingies.
        element.className = "obama-engine-canvas";
        element.setAttribute("autoload", true);

        // Apply html element and canvas rendering context to current instance.
        this.element = element;
        this.ctx = element.getContext("2d");

        // Stop calculating the process time and measure the difference.
        processEnd = Date.now();
        processDifference = processEnd - processStart;

        Debug.Log("obama engine", `Succesfully initialized canvas renderer in ${processDifference}ms.`, "lime");
    }
    /**
     * Appends canvas renderer element to an HTMLELement instance.
     * @param {HTMLElement} element
     * @return {this["element"] | this["ctx"]}
     */
    AppendToElement(element) {
        if (typeof element !== "undefined") {
            if (element instanceof HTMLElement) {

                element.appendChild(this.element);

                return [this.element, this.ctx];
            } else {
                Debug.Error("unexpected instance", "The required argument (as element) has to be a HTMLElement instance.", `Replace '${element}' with a HTMLElement instance.`);
            }
        } else {
            Debug.Error("undefined argument", "A HTML element is required in order to append the canvas renderer element.");
        }
    }
    /**
     * Sets background color.
     * @param {string | object} color
     */
    SetBackgroundColor(color) {
        switch (typeof color) {
            case "string":
                this.styles.backgroundColor = color;

                break;
            case "object":
                if (Array.isArray(color)) {

                    /**@type {Array} */
                    let colorArray = color;

                    if (colorArray.length == 3) {
                        let red = colorArray[0],
                            green = colorArray[1],
                            blue = colorArray[2];

                        let value = `rgb(${red}, ${green}, ${blue})`;

                        this.styles.backgroundColor = value;

                        return value;
                    }
                }

                break;
        }
    }

    /**
     * Destroys a render object.
     * @param {RenderObject} renderObject
     */
    Destroy(renderObject) {
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {
                let i = 0;

                while (i < this.renderObjects.length) {

                    let rObject = this.renderObjects[i];

                    if (rObject.id == renderObject.id) {
                        this.renderObjects.splice(i, 1);

                        renderObject = null;

                        return true;
                    }

                    i += 1;
                }
            } else {
                Debug.Error("unexpected instance", "The given argument (as renderObject) is not a RenderObject instance.");

                return;
            }
        } else {
            return "Undefined argument has been passed. Won't throw an error log.";
        }
    }
    /**
     * Sets the max render size, object withing that size will only render.
     * @param {any} width
     * @param {any} height
     */
    SetRenderSize(width, height) {
        // Check if arguments are both entered and are a number.
        let i = 0;

        while (i < arguments.length) {

            let arg = arguments[i];

            if (typeof arg !== "number" && arg !== null) {
                Debug.Error("invalid argument", "One of the provided arguments is not a number type.");

                return;
            }

            i += 1;
        }


    }

    Render() {
        let i = 0;

        let ctx = this.ctx;

        ctx.clearRect(0, 0, this.width, this.height);

        if (typeof this.styles.backgroundColor !== "undefined") {
            ctx.beginPath();

            ctx.fillStyle = this.styles.backgroundColor;
            ctx.fillRect(0, 0, this.width, this.height);

            ctx.closePath();
        }

        ctx.save();

        if (typeof this.renderCamera !== "undefined") {
            ctx.translate(this.renderCamera.x, this.renderCamera.y);
            ctx.scale(this.renderCamera.scale.x, this.renderCamera.scale.y);
        }

        while (i < this.renderObjects.length) {

            let renderObject = this.renderObjects[i];

            if (typeof renderObject.updateMain == "function") {
                renderObject.updateMain();
            }

            i += 1;
        }

        ctx.restore();
    }
}

export class RenderObject {
    constructor() {
        this.id = GenerateUniqueID(18);
        this.creationTimeStamp = performance.now();
        this.type = "renderobject";
        this.priority = 0 || "highest";
        this.updaters = [];

        this.velocityController;
        this.collisionController;
        this.gravityController;

        this.canDraw = true;
        this.camera = null;
        this.renderCamera = null;
    }
    updateMain() {

        if (this.camera !== null) {
            if (typeof this.x == "number" && typeof this.y == "number") {
                this.camera.UpdateOffset(-this.x, -this.y);
            }
        }

        if (this.renderCamera !== null) {
            if (typeof this.width == "number" && typeof this.height == "number" && typeof this.x == "number" && typeof this.y == "number") {
                if (this.x > -(this.renderCamera.x + this.renderCamera.cameraWidth / 2) &&
                    this.x < -(this.renderCamera.x - this.renderCamera.cameraWidth) &&
                    this.y > -(this.renderCamera.y + this.renderCamera.cameraHeight / 2) &&
                    this.y < -(this.renderCamera.y - (this.renderCamera.cameraHeight * 2))) {

                    this.canDraw = true;

                } else {
                    this.canDraw = false;
                }

                let i = 0;

                while (i < this.updaters.length) {

                    let updater = this.updaters[i];

                    if (updater instanceof pt_controllers_collision) {
                        if (this.canDraw) {
                            updater.Update();
                        }
                    } else {
                        if (typeof updater.Update == "function") {
                            updater.Update();
                        }
                    }
                    i += 1;
                }

                this.update();
            }
        } else {
            let i = 0;

            while (i < this.updaters.length) {

                let updater = this.updaters[i];

                if (typeof updater.Update == "function") {
                    updater.Update();
                }

                i += 1;
            }

            this.update();
        }
    }
    /**
     * Render object only in camera sight.
     * @param {pt_renderer_camera} camera
     */
    RenderInCamera(camera) {
        if (typeof camera !== "undefined") {
            if (camera instanceof pt_renderer_camera) {
                this.renderCamera = camera;

                return this;
            } else {
                Debug.Error("Unexpected instance", "The given argument is not a Camera instance.");
            }
        } else {
            Debug.Error("invalid argument", "The given argument has not been defined.");
        }
    }
    /**
     * Finds for a render object instance in a renderer.
     * @param {string} objectID
     */
    static GetObjectInRenderer(renderer, objectID) {

    }
}