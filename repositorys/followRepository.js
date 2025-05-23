import prisma from '../config/prisma.js';

const getFollowers = async (userId, size, nextCursor) => {
  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    take: size,
    skip: nextCursor,
  });

  const hasNext = followers.length === size;
  const cursor = hasNext ? nextCursor + size : null;

  return {
    items: followers,
    hasNext,
    cursor,
  };
};

const getFollowing = async (userId, size, nextCursor) => {
  const following = await prisma.follow.findMany({
    where: { followingId: userId },
    take: size,
    skip: nextCursor,
  });

  const hasNext = following.length === size;
  const cursor = hasNext ? nextCursor + size : null;

  return {
    items: following,
    hasNext,
    cursor,
    totalCount: following.length,
  };
};

const createFollow = async (followerId, followingId) => {
  // 팔로우하려는 사용자가 존재하는지 확인
  const followingUser = await prisma.user.findUnique({
    where: { id: followingId },
  });
  if (followerId === followingId) {
    throw new Error('자기 자신을 팔로우할 수 없습니다.');
  }

  if (!followingUser) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  // 이미 존재하는 팔로우 관계인지 확인
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  if (existingFollow) {
    throw new Error('이미 팔로우 중인 사용자입니다.');
  }

  return await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
};

export default { getFollowers, getFollowing, createFollow };
