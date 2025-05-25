import express from 'express';
import ratingController from '../controllers/ratingController.js';
import jwtToken from '../middleware/jwtToken.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/rating:
 *   post:
 *     tags:
 *       - Rating
 *     summary: 평점 생성
 *     description: 특정 사용자에게 평점을 남깁니다. 평점은 0.0부터 5.0 사이의 값이어야 합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ratedUserId
 *               - rate
 *             properties:
 *               ratedUserId:
 *                 type: integer
 *                 description: 평점을 남길 대상 사용자의 ID
 *               rate:
 *                 type: number
 *                 format: float
 *                 minimum: 0.0
 *                 maximum: 5.0
 *                 description: 평점 (0.0 ~ 5.0)
 *     responses:
 *       201:
 *         description: 평점 생성 성공
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
 *                   example: 평점 남기기 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 평점은 0.0부터 5.0 사이여야 합니다.
 *       401:
 *         description: 인증 실패
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
 *                   example: 인증에 실패했습니다.
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
router.post('/', jwtToken.accessVerifyToken, ratingController.createRating);

/**
 * @swagger
 * /api/v1/rating/{ratingId}:
 *   patch:
 *     tags:
 *       - Rating
 *     summary: 평점 수정
 *     description: 기존에 남긴 평점을 수정합니다. 평점은 0.0부터 5.0 사이의 값이어야 합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 평점의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rate
 *             properties:
 *               rate:
 *                 type: number
 *                 format: float
 *                 minimum: 0.0
 *                 maximum: 5.0
 *                 description: 수정할 평점 (0.0 ~ 5.0)
 *     responses:
 *       200:
 *         description: 평점 수정 성공
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
 *                   example: 평점 수정 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 유효하지 않은 평점입니다.
 *       401:
 *         description: 인증 실패
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
 *                   example: 인증에 실패했습니다.
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
  '/:ratingId',
  jwtToken.accessVerifyToken,
  ratingController.editRating
);

/**
 * @swagger
 * /api/v1/rating/{ratedUserId}:
 *   get:
 *     tags:
 *       - Rating
 *     summary: 평점 조회
 *     description: 특정 사용자의 평점 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ratedUserId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 평점을 조회할 대상 사용자의 ID
 *     responses:
 *       200:
 *         description: 평점 조회 성공
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
 *                   example: 평점 조회 성공
 *                 items:
 *                   type: object
 *                   properties:
 *                     averageRating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *                     totalRatings:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: 인증 실패
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
 *                   example: 인증에 실패했습니다.
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
router.get(
  '/:ratedUserId',
  jwtToken.accessVerifyToken,
  ratingController.getRating
);

/**
 * @swagger
 * /api/v1/rating/{userId}:
 *   delete:
 *     tags:
 *       - Rating
 *     summary: 평점 삭제
 *     description: 특정 사용자의 평점을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 평점을 삭제할 대상 사용자의 ID
 *     responses:
 *       200:
 *         description: 평점 삭제 성공
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
 *                   example: 평점 삭제 성공
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
router.delete('/:userId', ratingController.deleteRating);

export default router;
