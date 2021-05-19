import { Debug } from "../essentials/logger.js";
import { pt_renderer_canvas, RenderObject } from "./canvas.js";

export class pt_renderer_camera {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
        this.cameraWidth = 0;
        this.cameraHeight = 0;

        this.offsetX = 0;
        this.offsetY = 0;

        this.scale = {
            x: 1,
            y: 1
        }

        this.appliedRenderObjectInstance;
        this.appliedRendererInstance;

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
                this.appliedRendererInstance = canvasInstance;

                this.cameraWidth = canvasInstance.width;
                this.cameraHeight = canvasInstance.height;

                return this;
            } else {
                Debug.Error("unexpected instance", "The required argument has to be a Canvas Renderer instance.");
            }
        } else {
            Debug.Error("undefined argument", "The required argument has to be a Canvas Renderer instance.");
        }
    }
    /**
     * Updates camera offset.
     * @param {number} x
     * @param {number} y
     */
    UpdateOffset(x, y) {

        // Check if arguments arent defined.
        for (let i = 0; i < arguments.length; i++) {

            let arg = arguments[i];

            if (typeof arg !== "number") {
                Debug.Error("invalid argument", "One of the arguments is not defined or is not a number.");

                return;
            }
        }

        this.x = x + this.offsetX;
        this.y = y + this.offsetY;
    }
    Center(boolean) {
        if (typeof boolean == "boolean") {
            if (boolean) {
                if (typeof this.appliedRenderObjectInstance !== "undefined" && this.appliedRenderObjectInstance instanceof RenderObject) {

                    if (typeof this.appliedRendererInstance !== "undefined" && this.appliedRendererInstance instanceof pt_renderer_canvas) {
                        if (typeof this.appliedRenderObjectInstance.width == "number" && typeof this.appliedRenderObjectInstance.height == "number") {
                            this.width = this.appliedRenderObjectInstance.width;
                            this.height = this.appliedRenderObjectInstance.height;

                            this.offsetX = this.appliedRendererInstance.element.width / 2 - (this.width / 2);
                            this.offsetY = this.appliedRendererInstance.element.height / 2 - (this.height / 2);

                            return this;
                        } else {
                            Debug.Error("undefined instance properties", "The render object has no width or height properties. Cannot center the object.");
                            return;
                        }
                    } else {
                        Debug.Error("unapplied canvas renderer instance", "There has no canvas renderer instance applied to this instance.");
                        return;
                    }
                } else {
                    Debug.Error("unapplied renderobject", "There as no render object applied to this camera to center.", "Apply a render object using the 'SetTo' method.");
                    return;
                }
            }
        } else {
            Debug.Error("invalid argument", "The given argument (as boolean) is not a boolean.");
            return;
        }
    }
    /**
     * Sets camera to a render object.
     * @param {RenderObject} renderObject
     */
    SetTo(renderObject) {
        if (typeof renderObject !== "undefined") {
            if (renderObject instanceof RenderObject) {
                if (renderObject.camera == null) {
                    renderObject.camera = this;

                    this.appliedRenderObjectInstance = renderObject;

                    return this;
                } else {
                    Debug.Error("already applied camera", "A camera instance already has been applied to this render object.", "Remove the camera instance from this instance.");
                }
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