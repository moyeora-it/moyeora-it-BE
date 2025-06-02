import followRepository from '../repositorys/followRepository.js';
import userRepository from '../repositorys/userRepository.js';

const getFollowers = async (userId, size, cursor) => {
  await userRepository.getUserInfo(userId);
  const followers = await followRepository.getFollowers(userId, size, cursor);
  return followers;
};

const getFollowing = async (userId, size, cursor) => {
  await userRepository.getUserInfo(userId);
  const following = await followRepository.getFollowing(userId, size, cursor);
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
