import express from "express";
import { requestPasswordReset, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/reset_request", requestPasswordReset);
router.post("/reset_password", resetPassword);

export default router;
