import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/spring-auth:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Spring 서버 인증 정보 처리
 *     description: Spring 서버에서 전달받은 사용자 인증 정보를 처리하고 JWT 토큰을 생성하여 Redis에 저장합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - email
 *               - token
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 사용자 ID
 *                 example: 1
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 사용자 이메일
 *                 example: user@example.com
 *               token:
 *                 type: string
 *                 description: Spring 서버에서 발급받은 토큰
 *                 example: "spring-jwt-token"
 *     responses:
 *       200:
 *         description: 인증 정보 처리 성공
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
 *                   example: 인증 정보 저장 성공
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: JWT 토큰이 쿠키에 저장됩니다.
 *               example: accessToken=xxx; HttpOnly; Secure; SameSite=Strict
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
router.post('/spring-auth', authController.handleSpringAuth);

export default router;
