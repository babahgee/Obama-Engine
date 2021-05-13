import { Debug } from "./logger.js";

function resolveImage(src) {
    return new Promise(resolve => {
        if (src == "test") {
            resolve(true);
        } else {
            let img = new Image();
            img.src = src;

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