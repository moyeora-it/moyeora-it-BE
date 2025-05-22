import express from 'express';
import userController from '../controllers/userController.js';
import jwtToken from '../middleware/jwtToken.js';
import { uploadImage } from '../middleware/imageUpload.js';
const router = express.Router();

router.post('/signup', userController.signup); // 테스트완
router.post('/email-auth', userController.FindEmailAuth); // 테스트완
router.post('/login', userController.login); // 테스트완

router.patch('/delete', jwtToken.accessVerifyToken, userController.deleteUser); // 테스트완
router.get('/info', jwtToken.accessVerifyToken, userController.userInfo); // 테스트완
router.patch(
  '/edit',
  jwtToken.accessVerifyToken,
  uploadImage('image', false),
  userController.editUserInfo
); // 이미지, Skills(Java, JavaScript) 형식으로 테스트 완료, 비밀번호 변경 요청시 newPassword, confirmPassword를 보내야함
router.post(
  '/refresh',
  jwtToken.refreshVerifyToken,
  userController.refreshAccessToken
);
export default router;
