export const Debug = {
    /**
     * Logs an unique console message.
     * @param {string} type Message type.
     * @param {string} message Message body.
     * @param {string} color Message color.
     */
    Log: function (type, message, color) {
        if (typeof type == "string" && typeof message == "string" && typeof color == "string") {
            console.log(`%c[${type.toUpperCase()}]%c ${message}`, "color: red; background: #000;", `color: ${color};`);

            return [type, message, color];
        } else {
            throw new Error("One of the given arguments is not a string type or may be undefined.");
        }
    },
    /**
     * Returns an unique error message in the console.
     * @param {string} errorType Error type.
     * @param {string} errorMessage Error body.
     * @param {any | undefined} errorSolution Error solution (optional).
     */
    Error: function (errorType, errorMessage, errorSolution) {
        if (typeof errorType == "string" && typeof errorMessage == "string") {
            errorType = errorType.toUpperCase();

            let lineLength = errorMessage.length + 10, lineText = "";

            for (let i = 0; i < lineLength; i++) lineText += "-";

            if (typeof errorSolution !== "string") {
                errorSolution = "No possible solution found for this error.";
            }

            console.log(`%c${lineText}\n\n%c[ERROR:${errorType}]%c\n\n${errorMessage}\n\n%cPossible solution: ${errorSolution}\n\n${lineText}`, "color: red;", "color: red; background: #000;", "color: red; text-decoration: underline;", "color: red; font-style: italic;");

            return [errorType, errorMessage, errorSolution];
        }
    },
    /**
     * Sets an object of variables to global window object.
     * @param {object} variables
     */
    SetObjectToGlobal(variables) {
        if (typeof variables == "object") {
            for (let i in variables) {
                window[i] = variables[i]
            }
        }
    }
}