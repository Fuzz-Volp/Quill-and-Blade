import express from "express";
import {
  checkToken,
  dataController,
  apiController,
} from "../../controllers/api/user";

import ensureLoggedIn from "../../middleware/ensureLoggedIn";
const router = express.Router();

// POST /api/users/login
router.post("/login", dataController.login, apiController.auth);

// POST /api/users
router.post("/", dataController.create, apiController.auth);

//GET /api/users/check-token
router.get("/check-token", ensureLoggedIn, checkToken);
