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
export default router;
