import { Router } from 'express';
import { register, login, logout, getProfile, updateInfo, changePassword } from "../controllers/userController.js"

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', getProfile);
router.get('/logout', logout);
router.patch('/updateInfo', updateInfo);
router.post("/change_password", changePassword);


export default router;