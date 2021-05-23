import { Canvas, GenerateUniqueID } from "../main.js";
import { Debug } from "./logger.js";

export class pt_essentials_spritesheetcontroller {
    /**
     * Creates a spritesheet controller.
     * @param {HTMLImageElement} image
     */
    constructor(image) {
        if (typeof image == "undefined" || !(image instanceof HTMLImageElement)) Debug.Error("unexpected argument", "The given argument (as image) is not a image.");

        this.image = image;

        this.width = image.naturalWidth;
        this.height = image.naturalHeight;

        this.cutSprites = [];

        this.spriteLengthX = 0;
        this.spriteLengthY = 0;
    }
    /**Cuts the spritesheet image into seperate sprites. */
    Cut() {
        // Create a temporary canvas element.
        let temporaryCanvas = document.createElement("canvas");

        // Set the classname.
        temporaryCanvas.className = "spritesheet-temporary-canvas";

        // Add attributes.
        temporaryCanvas.setAttribute("canvas-id", GenerateUniqueID(18));
        temporaryCanvas.setAttribute("spritesheet-width", this.width);
        temporaryCanvas.setAttribute("spritesheet-height", this.height);
        temporaryCanvas.setAttribute("spritesheet-source", this.image.currentSrc);

        // Set the width and height.
        temporaryCanvas.width = this.width;
        temporaryCanvas.height = this.height;

        // Set important styles.
        temporaryCanvas.style = "display: none; visibility: hidden; opacity: 0; pointer-events: none; user-select: 0; border: none; background: none;";

        // Append canvas to body.
        document.body.appendChild(temporaryCanvas);

        // Create temporary context.
        let ctx = temporaryCanvas.getContext("2d");

        if (!ctx instanceof CanvasRenderingContext2D) {
            Debug.Error("spritesheet cut", "Failed to cut provided spritesheet into seperate sprites. Canvas2DRenderingContext is not supported apparently.");
            return;
        }

        // Draw the entire spritesheet image into a invisible canvas element.
        ctx.beginPath();
        ctx.drawImage(this.image, 0, 0);
        ctx.closePath();

        // Set default frame x and y positions.
        let frameX = 0;
        let frameY = 0;

        // Calculate frame width and height.
        let frameWidth = this.width / this.spriteLengthX;
        let frameHeight = this.height / this.spriteLengthY;

        // Define frame width and height to instance.
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        // Loop through array of spritesheets.
        for (let i = 0; i < this.spriteLengthX; i++) {

            // Get the image data of temporary canvas based on frame position and size.
            let imageData = ctx.getImageData(frameWidth * frameX, frameHeight * frameY, frameWidth, frameHeight);

            // Create temporary frame canvas.
            let frameCanvas = document.createElement("canvas");

            // Equal temporary canvas size with frame size.
            frameCanvas.width = frameWidth;
            frameCanvas.height = frameHeight;

            let frameCanvasCtx = frameCanvas.getContext("2d");

            // Draw frame data.
            frameCanvasCtx.putImageData(imageData, 0, 0);

            // Convert canvas data into base32 data.
            let base32Data = frameCanvas.toDataURL("image/png");

            // Load the base32 data into a native HTMLImage element.
            let frameImage = new Image();
            frameImage.src = base32Data;

            // Event when image has been loaded.
            frameImage.onload = () => {

                // Push loaded frame into array with cut sprites.
                this.cutSprites.push(frameImage);

                // Remove temporary frame canvas.
                frameCanvas.remove();

                // Clear garbage collection.
                frameCanvasCtx = null;
                frameCanvas = null;

            }

            // Positioning frames.
            if (frameX < this.spriteLengthX) {
                frameX += 1;
            } else {
                frameX = 0;
                frameY += 1;
            }
        }

        // Remove temporary canvas.
        temporaryCanvas.remove();

        // Clear garbage collection.
        temporaryCanvas = null;
        ctx = null;

        // Return array of cut sprites.
        return this.cutSprites;
    }
}