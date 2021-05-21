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

        ctx.beginPath();
        ctx.drawImage(this.image, 0, 0);
        ctx.closePath();

        let frameX = 0;
        let frameY = 0;

        let frameWidth = this.width / this.spriteLengthX;
        let frameHeight = this.height / this.spriteLengthY;

        this.frameWidth = this.width / this.spriteLengthX;
        this.frameHeight = this.height / this.spriteLengthY;

        for (let i = 0; i < this.spriteLengthX; i++) {
            let imageData = ctx.getImageData(frameWidth * frameX, frameHeight * frameY, frameWidth, frameHeight);

            let frameCanvas = document.createElement("canvas");

            frameCanvas.width = frameWidth;
            frameCanvas.height = frameHeight;

            let frameCanvasCtx = frameCanvas.getContext("2d");

            frameCanvasCtx.putImageData(imageData, 0, 0);

            let base32Data = frameCanvas.toDataURL("image/png");

            let frameImage = new Image();
            frameImage.src = base32Data;

            frameImage.onload = () => {
                this.cutSprites.push(frameImage);

                frameCanvas.remove();

                frameCanvasCtx = null;
                frameCanvas = null;

            }

            frameX += 1;
        }

        temporaryCanvas.remove();

        temporaryCanvas = null;
        ctx = null;

        return this.cutSprites;
    }
}