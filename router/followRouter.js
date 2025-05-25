import express from 'express';
import followController from '../controllers/followController.js';
import jwtToken from '../middleware/jwtToken.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/follow/{userId}/followers:
 *   get:
 *     tags:
 *       - Follow
 *     summary: 팔로워 목록 조회
 *     description: 특정 사용자의 팔로워 목록을 조회합니다. size와 nextCursor 쿼리 파라미터로 페이징이 가능합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로워를 조회할 대상 사용자의 ID
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 한 번에 조회할 팔로워 수 (기본값 10)
 *       - in: query
 *         name: nextCursor
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 다음 페이지를 위한 커서 (기본값 0)
 *     responses:
 *       200:
 *         description: 팔로워 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nickname:
 *                         type: string
 *                         example: 홍길동
 *                       profileImage:
 *                         type: string
 *                         example: https://example.com/profile.jpg
 *                 nextCursor:
 *                   type: integer
 *                   example: 20
 *       400:
 *         description: 잘못된 요청
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
router.get('/:userId/followers', followController.getFollowers);

/**
 * @swagger
 * /api/v1/follow/{userId}/following:
 *   get:
 *     tags:
 *       - Follow
 *     summary: 팔로잉 목록 조회
 *     description: 특정 사용자의 팔로잉 목록을 조회합니다. size와 nextCursor 쿼리 파라미터로 페이징이 가능합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로잉을 조회할 대상 사용자의 ID
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 한 번에 조회할 팔로잉 수 (기본값 10)
 *       - in: query
 *         name: nextCursor
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 다음 페이지를 위한 커서 (기본값 0)
 *     responses:
 *       200:
 *         description: 팔로잉 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 following:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nickname:
 *                         type: string
 *                         example: 홍길동
 *                       profileImage:
 *                         type: string
 *                         example: https://example.com/profile.jpg
 *                 nextCursor:
 *                   type: integer
 *                   example: 20
 *       400:
 *         description: 잘못된 요청
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
router.get('/:userId/following', followController.getFollowing);

/**
 * @swagger
 * /api/v1/follow/{userId}:
 *   post:
 *     tags:
 *       - Follow
 *     summary: 팔로우 생성
 *     description: 특정 사용자를 팔로우합니다. 자기 자신을 팔로우할 수 없습니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로우할 대상 사용자의 ID
 *     responses:
 *       200:
 *         description: 팔로우 생성 성공
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
 *                   example: 팔로우 성공
 *       400:
 *         description: 잘못된 요청
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
 *                   example: 자기 자신을 팔로우할 수 없습니다.
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
router.post(
  '/:userId',
  jwtToken.accessVerifyToken,
  followController.createFollow
);

/**
 * @swagger
 * /api/v1/follow/{userId}/unfollow:
 *   delete:
 *     tags:
 *       - Follow
 *     summary: 팔로우 삭제
 *     description: 특정 사용자에 대한 팔로우를 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로우를 삭제할 대상 사용자의 ID
 *     responses:
 *       200:
 *         description: 팔로우 삭제 성공
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
 *                   example: 팔로우 삭제 성공
 *       400:
 *         description: 잘못된 요청
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
router.delete(
  '/:userId/unfollow',
  jwtToken.accessVerifyToken,
  followController.deleteFollow
);

/**
 * @swagger
 * /api/v1/follow/{userId}/unfollower:
 *   delete:
 *     tags:
 *       - Follow
 *     summary: 팔로워 삭제
 *     description: 특정 사용자를 팔로워 목록에서 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팔로워 목록에서 삭제할 사용자의 ID
 *     responses:
 *       200:
 *         description: 팔로워 삭제 성공
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
 *                   example: 팔로우 삭제 성공
 *       400:
 *         description: 잘못된 요청
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
router.delete(
  '/:userId/unfollower',
  jwtToken.accessVerifyToken,
  followController.deleteFollower
);

export default router;
