import followRepository from '../repositorys/followRepository.js';

const getFollowers = async (userId, size, nextCursor) => {
  const followers = await followRepository.getFollowers(
    userId,
    size,
    nextCursor
  );
  return followers;
};

const getFollowing = async (userId, size, nextCursor) => {
  const following = await followRepository.getFollowing(
    userId,
    size,
    nextCursor
  );
  return following;
};

const createFollow = async (userId, targetUserId) => {
  const follow = await followRepository.createFollow(userId, targetUserId);
  return follow;
};

const deleteFollow = async (userId, targetUserId) => {
  const follow = await followRepository.deleteFollow(userId, targetUserId);
  return follow;
};

const deleteFollower = async (userId, targetUserId) => {
  const follow = await followRepository.deleteFollower(userId, targetUserId);
  return follow;
};

export default {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
  deleteFollower,
};
