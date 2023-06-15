import express from "express";
import { dataController, apiController } from "../../controllers/api/user";

import checkToken from "../../middleware/checkToken";
import ensureLoggedIn from "../../middleware/ensureLoggedIn";

const router = express.Router();

// POST /api/users/login
router.post("/login", dataController.login, apiController.auth);

// POST /api/users
router.post("/", dataController.register, apiController.auth);

//GET /api/users/check-token
router.get("/check-token", ensureLoggedIn, checkToken);

export = router;
