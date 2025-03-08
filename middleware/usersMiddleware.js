import fs from "fs"; // Importing the file system module to handle file operations
import { getFilePath, neoResponse } from "../utils/index.js"; // Importing utility functions for file path retrieval and response formatting

// Middleware function to check for user data availability
export default function usersMiddleware(_req, res, next) {
  try {
    const usersDataFile = getFilePath("data/users.json"); // Retrieving the path for the user data file
    // Asynchronously reading the user data file
    fs.readFile(usersDataFile, "utf8", (err, data) => {
      if (err) {
        // Handling error if the file cannot be read
        return res.status(302).send(neoResponse("Data not found!", "create"));
      }
      let users = JSON.parse(data); // Parsing the JSON data into a JavaScript object
      if (!users.length) {
        // Checking if there are no users in the data
        return res.status(302).send(neoResponse("No users found!", "/create")); // Sending error response if no users are found
      } else {
        return next(); // Proceeding to the next middleware if users are found
      }
    });
  } catch (error) {
    console.log(error); // Logging unexpected errors
    return res
      .status(302)
      .send(neoResponse("Something went wrong!", "/create")); // Handling unexpected errors
  }
}
