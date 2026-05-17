import express from "express";
import { userSignUp, userLogin, userLogout, getProfile } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', userSignUp);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.get('/me', getProfile);

export default router;