import followService from '../services/followService.js';

const getFollowers = async (req, res) => {
  const { userId } = req.params;
  const { size, cursor, name } = req.query;
  try {
    const followers = await followService.getFollowers(
      parseInt(userId),
      parseInt(size) || 10,
      parseInt(cursor) || 0,
      name || ''
    );
    res.status(200).json({ status: { success: true }, items: followers });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const getFollowing = async (req, res) => {
  const { userId } = req.params;
  const { size, cursor, name } = req.query;
  try {
    const following = await followService.getFollowing(
      parseInt(userId),
      parseInt(size) || 10,
      parseInt(cursor) || 0,
      name || ''
    );
    res.status(200).json({ status: { success: true }, items: following });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const createFollow = async (req, res) => {
  const { id: userId } = req.user;
  const { userId: targetUserId } = req.params;
  try {
    if (userId === targetUserId) {
      return res.status(400).json({
        status: {
          success: false,
          code: 400,
          message: '자기 자신을 팔로우할 수 없습니다.',
        },
      });
    }

    await followService.createFollow(parseInt(userId), parseInt(targetUserId));
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const deleteFollow = async (req, res) => {
  const { id: userId } = req.user;
  const { userId: targetUserId } = req.params;
  try {
    await followService.deleteFollow(parseInt(userId), parseInt(targetUserId));
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const deleteFollower = async (req, res) => {
  const { id: userId } = req.user;
  const { userId: targetUserId } = req.params;
  try {
    await followService.deleteFollower(
      parseInt(userId),
      parseInt(targetUserId)
    );
    res.status(204).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};
export default {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
  deleteFollower,
};
