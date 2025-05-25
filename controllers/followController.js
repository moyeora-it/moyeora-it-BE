import followService from '../services/followServices.js';

const getFollowers = async (req, res) => {
  const { userId } = req.params;
  const { size, nextCursor } = req.query;

  const followers = await followService.getFollowers(
    parseInt(userId),
    parseInt(size) || 10,
    parseInt(nextCursor) || 0
  );
  res.status(200).json(followers);
};

const getFollowing = async (req, res) => {
  const { userId } = req.params;
  const { size, nextCursor } = req.query;

  const following = await followService.getFollowing(
    parseInt(userId),
    parseInt(size) || 10,
    parseInt(nextCursor) || 0
  );
  res.status(200).json(following);
};

const createFollow = async (req, res) => {
  const { id: userId } = req.user;
  const { userId: targetUserId } = req.params;

  if (userId === targetUserId) {
    return res
      .status(400)
      .json({ message: '자기 자신을 팔로우할 수 없습니다.' });
  }

  await followService.createFollow(parseInt(userId), parseInt(targetUserId));
  res.status(200).json({ message: '팔로우 성공' });
};

const deleteFollow = async (req, res) => {
  const { id: userId } = req.user;
  const { userId: targetUserId } = req.params;
  try {
    await followService.deleteFollow(parseInt(userId), parseInt(targetUserId));
    res.status(200).json({ message: '팔로우 삭제 성공' });
  } catch (error) {
    res.status(400).json({ message: '팔로우 삭제 실패' });
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
    res.status(200).json({ message: '팔로우 삭제 성공' });
  } catch (error) {
    res.status(400).json({ message: '팔로우 삭제 실패' });
  }
};
export default {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
  deleteFollower,
};
