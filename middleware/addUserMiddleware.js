import fs from "fs"; // Importing the file system module to handle file operations
import { getFilePath, neoResponse } from "../utils/index.js"; // Importing utility functions for file path retrieval and response formatting

// Middleware function to validate user input
export function validateUser(req, res, next) {
  try {
    const body = req.body; // Extracting the request body for validation
    const isValidName = (name) => /^[A-Za-z]+$/.test(name); // Function to validate names using a regular expression
    if (!isValidName(body.firstName) || !isValidName(body.lastName)) {
      // Checking if the first and last names are valid
      return res
        .status(400)
        .send(neoResponse("Please enter valid names!", "/create")); // Sending error response if names are invalid
    }
    next(); // Proceeding to the next middleware if validation passes
  } catch (error) {
    return res.status(400).send(neoResponse("Something went wrong!")); // Handling unexpected errors
  }
}

// Middleware function to check for duplicate users
export function checkDuplicateUser(req, res, next) {
  try {
    const user = req.body; // Extracting the user data from the request body
    const usersDataFile = getFilePath("data/users.json"); // Retrieving the path for the user data file

    // Asynchronously reading the user data file
    fs.readFile(usersDataFile, "utf8", (err, data) => {
      if (err) {
        return res
          .status(500)
          .send(neoResponse("Failed to read user data!", "/create")); // Handling error if the file cannot be read
      }
      let users = [];
      if (data) {
        try {
          users = JSON.parse(data); // Parsing the JSON data into a JavaScript object
        } catch (error) {
          return res
            .status(500)
            .send(neoResponse("User data file is corrupted!", "/create")); // Handling corrupted data
        }
      }
      // Checking if the user already exists in the data
      const isDuplicate = users.some(
        (u) => u.firstName === user.firstName && u.lastName === user.lastName
      );

      if (isDuplicate) {
        return res
          .status(400)
          .send(neoResponse("User already exist!", "/create")); // Sending error response if a duplicate user is found
      }
      next(); // Proceeding to the next middleware if no duplicates are found
    });
  } catch (error) {
    return res
      .status(500)
      .send(neoResponse("Something went wrong!", "/create")); // Handling unexpected errors
  }
}
