import { Debug } from "../essentials/logger.js";
import { pt_renderer_canvas, RenderObject } from "../renderer/canvas.js";

/**
 * Converts array with colors to a rgb string.
 * @param {object} arr
 */
function convertArrayToString(arr) {
    if (typeof arr == "object") {
        if (Array.isArray(arr)) {
            if (arr.length == 3) {

                let red = arr[0],
                    green = arr[1],
                    blue = arr[2];

                return `rgb(${red}, ${green}, ${blue})`;

            } else {
                Debug.Error("unsupported color array", "Cannot convert a array with 4 color values.", "Remove the alpha value in the array.");
            }
        }
    }
}

export class pt_objects_rectangle extends RenderObject {
    // Private propertiess.
    #ctx;
    #canvasInstance;

    /**
     * Creates a rectangle.
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {object} styles
     * @param {string | object} styles.backgroundColor
     * @param {string | object} styles.borderColor
     * @param {string | object} styles.blurColor
     * @param {number} styles.borderWidth
     * @param {number} styles.blurOffsetX
     * @param {number} styles.blurOffsetY
     * @param {number} styles.blurStrength
     * @param {string} styles.globalCompositeOperation
     * 
     * Signature:
     * 
     * ```javascript
     * {
     *  width: Number,
     *  height: Number
     * }
     * ```
     */
    constructor(x, y, width, height, styles) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.styles = styles;

        this.renderImage;
        this.renderImageWidth = 0;
        this.renderImageHeight = 0;

        this.events = {onHover: undefined};
        this.eventStates = {isHovering: false};

        // Parse style values.
        if (typeof styles == "object") {
            if (typeof styles.backgroundColor == "object") this.styles.backgroundColor = convertArrayToString(this.styles.backgroundColor);
            if (typeof styles.borderColor == "object") this.styles.borderColor = convertArrayToString(this.styles.borderColor);
            if (typeof styles.blurColor == "object") this.styles.blurColor = convertArrayToString(this.styles.blurColor);
        }
    }
    draw() {
        if (typeof this.#ctx == "undefined") return;

        /**@type {CanvasRenderingContext2D} */
        let ctx = this.#ctx;

        ctx.save();

        ctx.beginPath();

        if (typeof this.styles.globalCompositeOperation == "string") {
            ctx.globalCompositeOperation = this.styles.globalCompositeOperation;
        }

        if (typeof this.styles.blurColor == "string") ctx.shadowColor = this.styles.blurColor;
        if (typeof this.styles.blurOffsetX == "number") ctx.shadowOffsetX = this.styles.blurOffsetX;
        if (typeof this.styles.blurOffsetY == "number") ctx.shadowOffsetY = this.styles.blurOffsetY;
        if (typeof this.styles.blurStrength == "number") ctx.shadowBlur = this.styles.blurStrength;

        if (typeof this.renderImage !== "undefined") {
            ctx.drawImage(this.renderImage, this.x, this.y, this.width, this.height);
        } else {

            ctx.rect(this.x, this.y, this.width, this.height);

            if (typeof this.styles.backgroundColor == "string") {
                ctx.fillStyle = this.styles.backgroundColor;
                ctx.fill();
            }

            if (typeof this.styles.borderWidth == "number") {
                ctx.lineWidth = this.styles.borderWidth;
            }

            if (typeof this.styles.borderColor == "string") {
                ctx.strokeStyle = this.styles.borderColor;
                ctx.stroke();
            }
        }

        ctx.closePath();
        ctx.restore();

        // Debug
        //ctx.beginPath();
        //ctx.font = "monospace";
        //ctx.fillStyle = "green";
        //ctx.fillText(`x: ${this.x} y: ${this.y}`, this.x, this.y - 40);
        //ctx.closePath();

    }
    update() {

        const { mouse } = this.#canvasInstance;

        if (typeof this.events.onHover == "function") {
            if (mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height) {
                if (!this.eventStates.isHovering) {

                    this.events.onHover(this);


                    this.eventStates.isHovering = true;
                }
            } else {
                this.eventStates.isHovering = false;
            }
        }

        if (this.canDraw) this.draw();
    }

    // Public methods

    /**
     * User events on this instance.
     * @param {"hover" | "click" | "scroll"} event
     * @param {Function} listener
     */
    On(event, listener) {
        switch (event) {
            case "hover":
                if (typeof listener == "function") {
                    this.events.onHover = listener;
                } else {
                    Debug.Error(`invalid type`, "The required argument as listener has to be a function.");
                }

                return this;
                break;
            case "click":
                if (typeof listener == "function") {
                    this.events.onClick = listener;
                } else {
                    Debug.Error(`invalid type`, "The required argument as listener has to be a function.");
                }

                return this;
                break;
            case "scroll":
                if (typeof listener == "function") {
                    this.events.onScroll = listener;
                } else {
                    Debug.Error(`invalid type`, "The required argument as listener has to be a function.");
                }

                return this;
                break;
            default:
                Debug.Error("unrecognized instance event", `The given argument '${event}' is not a recognized event for this instance.`);

                return;
                break;
        }
    }
    /**
     * 
     * @param {HTMLImageElement} image
     */
    SetRenderImage(image) {
        if (typeof image !== "undefined" && image instanceof HTMLImageElement) {
            this.renderImage = image;

            return this;
        } else {
            Debug.Error("unexpected instance", "The required argument is not a HTMLImageElement instance.");
        }
    }
    /**
     * Applies to canvas instance.
     * @param {pt_renderer_canvas} canvasInstance
     */
    ApplyTo(canvasInstance) {
        if (typeof canvasInstance !== "undefined") {
            if (canvasInstance instanceof pt_renderer_canvas) {
                canvasInstance.renderObjects.push(this);

                this.#ctx = canvasInstance.ctx;
                this.#canvasInstance = canvasInstance;

                return this;
            } else {
                Debug.Error("unexpected instance", "The required argument has to be a Canvas Renderer instance.");
            }
        } else {
            Debug.Error("undefined argument", "The required argument has to be a Canvas Renderer instance.");
        }
    }
}