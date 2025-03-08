import { getFilePath } from "../utils/index.js";

/**
 * Controller function to handle requests for creating a user.
 *
 * @param {Object} _req - The request object (not used in this function).
 * @param {Object} res - The response object used to send the HTML file.
 * @param {Function} next - The next middleware function in the stack.
 */
export default function createController(_req, res, next) {
  try {
    // Sending the create-user.html file as a response with a 200 status code
    res.status(200).sendFile(getFilePath("views/create-user.html"));
  } catch (error) {
    // Passing any errors to the next middleware for handling
    next(error);
  }
}
