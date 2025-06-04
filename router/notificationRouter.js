import express from 'express';
import notificationController from '../controllers/notificationController.js';
import jwtToken from '../middleware/jwtToken.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/notification:
 *   get:
 *     tags:
 *       - Notification
 *     summary: 알림 목록 조회
 *     description: 로그인한 사용자의 알림 목록을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: size
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 한 번에 가져올 알림 개수
 *       - in: query
 *         name: cursor
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 페이지네이션을 위한 커서(시작 인덱스)
 *     responses:
 *       200:
 *         description: 알림 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                 items:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           content:
 *                             type: string
 *                             example: "새로운 알림입니다."
 *                           read:
 *                             type: boolean
 *                             example: false
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-05-01T12:34:56.000Z"
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-05-01T12:34:56.000Z"
 *                           user_id:
 *                             type: integer
 *                             example: 1
 *                     hasNext:
 *                       type: boolean
 *                       example: false
 *                     cursor:
 *                       type: integer
 *                       example: 10
 *                     totalCount:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 401
 *                     message:
 *                       type: string
 *                       example: "인증에 실패했습니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.get(
  '/',
  jwtToken.accessVerifyToken,
  notificationController.getNotification
);

/**
 * @swagger
 * /api/v1/notification/{notificationId}/read:
 *   patch:
 *     tags:
 *       - Notification
 *     summary: 알림 읽음 처리
 *     description: 특정 알림을 읽음 처리합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 읽음 처리할 알림의 ID
 *     responses:
 *       200:
 *         description: 알림 읽음 처리 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 200
 *       404:
 *         description: 알림을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 404
 *                     message:
 *                       type: string
 *                       example: "알림을 찾을 수 없습니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.patch(
  '/:notificationId/read',
  jwtToken.accessVerifyToken,
  notificationController.readNotification
);

/**
 * @swagger
 * /api/v1/notification/{notificationId}:
 *   delete:
 *     tags:
 *       - Notification
 *     summary: 알림 삭제
 *     description: 특정 알림을 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 삭제할 알림의 ID
 *     responses:
 *       200:
 *         description: 알림 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 200
 *       404:
 *         description: 알림을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 404
 *                     message:
 *                       type: string
 *                       example: "알림을 찾을 수 없습니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.delete(
  '/:notificationId',
  jwtToken.accessVerifyToken,
  notificationController.deleteNotification
);

/**
 * @swagger
 * /api/v1/notification:
 *   delete:
 *     tags:
 *       - Notification
 *     summary: 알림 전체 삭제
 *     description: 로그인한 사용자의 모든 알림을 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 알림 전체 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 200
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.delete(
  '/',
  jwtToken.accessVerifyToken,
  notificationController.deleteAllNotification
);

/**
 * @swagger
 * /api/v1/notification/unread-count:
 *   get:
 *     tags:
 *       - Notification
 *     summary: 읽지 않은 알림 개수 조회
 *     description: 로그인한 사용자의 읽지 않은 알림 개수를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 읽지 않은 알림 개수 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 200
 *                     count:
 *                       type: object
 *                       properties:
 *                         unreadCount:
 *                           type: integer
 *                           example: 3
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.get(
  '/unread-count',
  jwtToken.accessVerifyToken,
  notificationController.getNotificationCount
);
export default router;
