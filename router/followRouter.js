import express from 'express';
import followController from '../controllers/followController.js';
import jwtToken from '../middleware/jwtToken.js';

const router = express.Router();

router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);
router.post(
  '/:userId',
  jwtToken.accessVerifyToken,
  followController.createFollow
);
router.delete(
  '/:userId/unfollow',
  jwtToken.accessVerifyToken,
  followController.deleteFollow
);
router.delete(
  '/:userId/unfollower',
  jwtToken.accessVerifyToken,
  followController.deleteFollower
);

export default router;
