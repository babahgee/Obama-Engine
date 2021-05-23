import { Debug } from "./logger.js";

/**
 * Resolves image
 * @param {string} src
 */
function resolveImage(src) {

    // Returns a promise instnace.
    return new Promise(resolve => {

        // If the given argument (as src) is equal to "test", resolve the promise instance immediately.
        if (src == "test") {
            resolve(true);
        } else {

            // Create native HTLMImage element.
            let img = new Image();

            // Load image.
            img.src = src;

            // Resolve promise with image element passed when loaded succesfully.
            img.onload = () => {
                resolve(img);
            }
        }
    });
}


/**
 * Loads and return an image object asynchronously.
 * @param {string} imageSource
 */
export async function pt_loadImageSync(imageSource) {
    if (typeof imageSource == "string") {
        return await resolveImage(imageSource);
    } else {
        Debug.Error("invalid argument", "The required argument is not a string.");
    }
}