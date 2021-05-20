import { Debug } from "./logger.js";

export class pt_essentials_spritesheetcontroller {
    /**
     * Creates a spritesheet controller.
     * @param {HTMLImageElement} image
     */
    constructor(image) {
        if (typeof image == "undefined" || !(image instanceof HTMLImageElement)) Debug.Error("unexpected argument", "The given argument (as image) is not a image.");

        this.image = image;

        console.log(image);
    }
}