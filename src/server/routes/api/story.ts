import express from "express";
import { dataController, apiController } from "../../controllers/api/story";

const router = express.Router();

// Index: GET
router.get("/", dataController.index, apiController.index);

// Delete: DELETE
router.delete("/:id", dataController.destroy, apiController.show);

// Update: PUT
router.put("/:id", dataController.update, apiController.show);

// Create: POST
router.post("/", dataController.create, apiController.show);

// Show: GET
router.get("/:id", dataController.show, apiController.show);

export default router;
