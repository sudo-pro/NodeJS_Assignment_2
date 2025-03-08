import { Router } from "express";
import {
  validateUser,
  checkDuplicateUser,
} from "../middleware/addUserMiddleware.js";
import usersMiddleware from "../middleware/usersMiddleware.js";
import usersController from "../controllers/usersController.js";
import addUserController from "../controllers/addUserController.js";
import createController from "../controllers/createController.js";

const router = Router(); // Creating a new router instance

// Route for adding a new user, with validation and duplicate checking middleware
router.post("/add-user", validateUser, checkDuplicateUser, addUserController);

// Route for retrieving users, with middleware to check user data availability
router.get("/users", usersMiddleware, usersController);

// Route for rendering the user creation page
router.get("/create", createController);

export default router; // Exporting the router instance for use in the main application
