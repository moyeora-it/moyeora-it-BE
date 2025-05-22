import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.patch('/delete', userController.deleteUser);
router.get('/info', userController.userInfo);
router.patch('/edit', userController.editUserInfo);
router.post('/email-auth', userController.FindEmailAuth);
router.post('/login', userController.login);
export default router;
