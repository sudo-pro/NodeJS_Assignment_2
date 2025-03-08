import fs from "fs";
import { getFilePath, neoResponse } from "../utils/index.js";

/**
 * Controller function to add a new user.
 *
 * @param {Object} req - The request object containing user data in req.body.
 * @param {Object} res - The response object used to send responses back to the client.
 */
export default function addUserController(req, res) {
  try {
    // Extract user data from the request body
    const user = req.body;

    // Get the file path for the users data file
    const usersDataFile = getFilePath("data/users.json");

    // Initialize an empty array to hold existing users
    let users = [];

    // Read the existing users data from the JSON file
    fs.readFile(usersDataFile, "utf8", (err, data) => {
      if (err) {
        // Log the error and send a response indicating failure to read user data
        console.log(err);
        return res
          .status(500)
          .send(neoResponse("Failed to read user data!", "/create"));
      }

      // Parse the existing user data or initialize an empty array if no data exists
      users = data ? JSON.parse(data) : [];

      // Add the new user to the users array
      users.push(user);

      // Write the updated users array back to the JSON file
      fs.writeFile(usersDataFile, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          // Send a response indicating failure to save user data
          return res
            .status(500)
            .send(neoResponse("Failed to save user data!", "/create"));
        }

        // Send a success response indicating the user was added successfully
        res
          .status(200)
          .send(neoResponse("User  added successfully!", "/users"));
      });
    });
  } catch (error) {
    // Catch any unexpected errors and send a generic error response
    return res
      .status(500)
      .send(neoResponse("Something went wrong!", "/create"));
  }
}
