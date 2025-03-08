import fs from "fs";
import { getFilePath, neoResponse } from "../utils/index.js";

/**
 * Controller function to handle user-related requests
 *
 * @param {Object} _req - The request object (not used in this function).
 * @param {Object} res - The response object used to send the HTML file.
 */
export default function usersController(_req, res) {
  try {
    // Retrieving the path for the users data file
    const dataPath = getFilePath("data/users.json");

    // Asynchronously reading the users data file
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        // Handling error if the file cannot be read
        return res
          .status(500)
          .send(neoResponse("Error reading users data!", "/create"));
      }

      // Parsing the JSON data into a JavaScript object
      const users = JSON.parse(data);
      // Retrieving the path for the HTML template file
      const userListFile = getFilePath("views/user-list.html");

      // Asynchronously reading the HTML template file
      fs.readFile(userListFile, "utf8", (err, htmlFile) => {
        if (err) {
          // Handling error if the HTML template cannot be read
          return res
            .status(500)
            .send(neoResponse("Error reading HTML template!", "/create"));
        }

        // Generating table rows for each user
        let tableRows = "";
        users.forEach((user) => {
          tableRows += `
            <tr>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
            </tr>`;
        });

        // Replacing the placeholder in the HTML template with the generated table rows
        const updatedHtml = htmlFile.replace(
          '<tbody id="user-list-data"></tbody>',
          `<tbody id="user-list-data">${tableRows}</tbody>`
        );

        // Sending the updated HTML response back to the client
        res.send(updatedHtml);
      });
    });
  } catch (error) {
    // Handling unexpected errors
    return res
      .status(500)
      .send(neoResponse("Something went wrong!", "/create"));
  }
}
