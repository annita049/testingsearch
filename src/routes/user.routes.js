import express from "express";
import * as userController from "../controllers/user.controller.js";
import searchController from "../controllers/search.controller.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/search", searchController);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
