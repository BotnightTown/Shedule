import { Router } from 'express';
import { requestPasswordReset, resetPassword } from "../controllers/authController.js";

const router = Router();

router.post("/reset_request", requestPasswordReset);
router.post("/reset_password", resetPassword);

export default router;
