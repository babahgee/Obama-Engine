import { Debug } from "../essentials/logger.js";
import { pt_renderer_canvas, RenderObject } from "./canvas.js";

export class pt_renderer_camera {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.type = "pt_render_camera";
    }
    /**
     * Applies to canvas instance.
     * @param {pt_renderer_canvas} canvasInstance
     */
    ApplyTo(canvasInstance) {
        if (typeof canvasInstance !== "undefined") {
            if (canvasInstance instanceof pt_renderer_canvas) {
                canvasInstance.renderCamera = this;

                return this;
            } else {
                Debug.Error("unexpected instance", "The required argument has to be a Canvas Renderer instance.");
            }
        } else {
            Debug.Error("undefined argument", "The required argument has to be a Canvas Renderer instance.");
        }
    }
    /**
     * Sets camera to a render object.
     * @param {RenderObject} renderObject
     */
    SetTo(renderObject) {
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {

            } else {
                Debug.Error("unexpected instance", "The required argument has to be a Canvas Renderer instance.");
                return;
            }
        } else {
            Debug.Error("undefined argument", "The required argument has to be a RenderObject instance.");
            return;
        }
    }
}