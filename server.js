import express from "express";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import { getFilePath } from "./utils/index.js";

const app = express(); // Creating an Express application instance
const PORT = 3000; // Defining the server port

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse URL-encoded data
app.use(express.static(getFilePath("public"))); // Serving static files from the public directory

app.get("/", (_req, res) => {
  return res.status(200).sendFile(getFilePath("views/home.html")); // Serving the home page
});

app.use(userRoutes); // Using user routes for handling user-related requests

app.use("/", (_req, res) => {
  return res.status(404).sendFile(getFilePath("views/404.html")); // Serving 404 error page for unmatched routes
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err); // Logging any startup errors
    return process.exit(1); // Exiting the process on error
  }
  console.log(`Server is running on http://localhost:${PORT}`); // Logging server URL
});
