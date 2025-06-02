import express from 'express';
import userController from '../controllers/userController.js';
import jwtToken from '../middleware/jwtToken.js';
import { uploadImage } from '../middleware/imageUpload.js';

const router = express.Router();
/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: 사용자 비밀번호
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 회원가입 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post('/signup', userController.signup); // 테스트완

/**
 * @swagger
 * /api/v1/user/email-auth:
 *   post:
 *     tags:
 *       - User
 *     summary: 이메일 인증 요청
 *     description: 사용자의 이메일로 인증 메일을 발송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 인증을 받을 이메일 주소
 *     responses:
 *       200:
 *         description: 이메일 인증 메일 발송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 이메일 인증 메일 발송 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post('/email-auth', userController.FindEmailAuth);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그인
 *     description: 사용자 로그인을 수행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 user:
 *                   type: object
 *                   description: 사용자 정보
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/v1/user/check-email-auth:
 *   post:
 *     tags:
 *       - User
 *     summary: 이메일 인증번호 확인
 *     description: 이메일과 인증번호를 받아 인증을 완료합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - authNum
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 인증을 받을 이메일 주소
 *               authNum:
 *                 type: string
 *                 example: "123456"
 *                 description: 이메일로 받은 인증번호
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 이메일 인증 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post('/check-email-auth', userController.checkEmailAuth);

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그아웃
 *     description: 사용자 로그아웃을 수행합니다. (쿠키의 토큰이 삭제됩니다)
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 로그아웃 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post('/logout', userController.logout);

/**
 * @swagger
 * /api/v1/user/info:
 *   get:
 *     tags:
 *       - User
 *     summary: 내 정보 조회
 *     description: 인증된 사용자의 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 유저 정보 조회 성공
 *                 items:
 *                   type: object
 *                   description: 유저 정보 객체
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.get('/info', jwtToken.accessVerifyToken, userController.userInfo);

router.get('/my-group', jwtToken.accessVerifyToken, userController.getMyGroup);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: 특정 유저 정보 조회
 *     description: userId로 특정 사용자의 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 유저의 ID
 *     responses:
 *       200:
 *         description: 유저 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 유저 정보 조회 성공
 *                 items:
 *                   type: object
 *                   description: 유저 정보 객체
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.get('/:userId', userController.getByUserId);

/**
 * @swagger
 * /api/v1/user/delete:
 *   delete:
 *     tags:
 *       - User
 *     summary: 회원 탈퇴
 *     description: 인증된 사용자가 회원 탈퇴를 진행합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: 회원 탈퇴 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 회원 탈퇴 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.delete('/delete', jwtToken.accessVerifyToken, userController.deleteUser);

/**
 * @swagger
 * /api/v1/user/edit:
 *   patch:
 *     tags:
 *       - User
 *     summary: 내 정보 수정
 *     description: 인증된 사용자가 자신의 정보를 수정합니다. (이미지, 닉네임, 포지션, skills, 비밀번호 변경 등)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 파일
 *               nickname:
 *                 type: string
 *                 example: 홍길동
 *                 description: 닉네임
 *               position:
 *                 type: string
 *                 example: 백엔드
 *                 description: 포지션
 *               skills:
 *                 type: string
 *                 example: Java,JavaScript
 *                 description: 쉼표(,)로 구분된 기술 스택 문자열
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *                 description: 새 비밀번호(변경 시)
 *               confirmPassword:
 *                 type: string
 *                 example: newpassword123
 *                 description: 새 비밀번호 확인(변경 시)
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 유저 정보 수정 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.patch(
  '/edit',
  jwtToken.accessVerifyToken,
  uploadImage('image', false),
  userController.editUserInfo
);

/**
 * @swagger
 * /api/v1/user/refresh:
 *   post:
 *     tags:
 *       - User
 *     summary: 액세스 토큰 갱신
 *     description: 리프레시 토큰을 이용해 새로운 액세스 토큰을 발급받습니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 액세스 토큰 갱신 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 액세스 토큰 갱신 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post(
  '/refresh',
  jwtToken.refreshVerifyToken,
  userController.refreshAccessToken
);

/**
 * @swagger
 * /api/v1/user/check-email:
 *   post:
 *     tags:
 *       - User
 *     summary: 이메일 중복 체크
 *     description: 회원가입 시 이메일 중복 여부를 확인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: 이메일 중복 체크 결과
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "이메일이 중복되지 않습니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "서버 에러가 발생했습니다."
 */
router.post('/check-email', userController.checkEmail);

export default router;
