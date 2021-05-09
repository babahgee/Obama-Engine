import { Debug } from "../essentials/logger.js";

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
        this.width = width;
        this.height = height;
        this.options = options;

        this.renderObjects = [];

        this.styles = {
            backgroundColor: undefined
        };

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

        // Other thingies.
        element.className = "obama-engine-canvas";
        element.setAttribute("autoload", true);

        // Apply html element and canvas rendering context to current instance.
        this.element = element;
        this.ctx = element.getContext("2d");
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
        }

        while (i < this.renderObjects.length) {

            let renderObject = this.renderObjects[i];

            if (typeof renderObject.update == "function") {
                renderObject.update();
            }

            i += 1;
        }

        ctx.restore();
    }
}