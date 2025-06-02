import prisma from '../config/prisma.js';

const getFollowers = async (userId, size, cursor, name) => {
  // name이 null이면 검색 조건을 제외
  const whereCondition = {
    following_id: userId,
    ...(name && {
      following: {
        nickname: { contains: name, mode: 'insensitive' },
      },
    }),
  };

  const followTotalCount = await prisma.follow.count({
    where: whereCondition,
  });

  const followers = await prisma.follow.findMany({
    where: whereCondition,
    take: size,
    skip: cursor,
    include: {
      following: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
    },
  });

  const hasNext = followers.length === size;
  const nextCursor = hasNext ? cursor + size : null;

  return {
    items: followers,
    cursor: nextCursor,
    hasNext,
    totalCount: followTotalCount,
  };
};

const getFollowing = async (userId, size, cursor, name) => {
  const whereCondition = {
    following_id: userId,
    ...(name && {
      following: {
        nickname: { contains: name, mode: 'insensitive' },
      },
    }),
  };
  const followTotalCount = await prisma.follow.count({
    where: whereCondition,
  });
  const following = await prisma.follow.findMany({
    where: whereCondition,
    take: size,
    skip: cursor,
    include: {
      following: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
    },
  });

  const hasNext = following.length === size;
  const nextCursor = hasNext ? cursor + size : null;

  return {
    items: following,
    hasNext,
    cursor: nextCursor,
    totalCount: followTotalCount,
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
      follower_id_following_id: {
        follower_id: followerId,
        following_id: followingId,
      },
    },
  });

  if (existingFollow) {
    throw new Error('이미 팔로우 중인 사용자입니다.');
  }

  return await prisma.follow.create({
    data: {
      follower_id: followerId,
      following_id: followingId,
    },
  });
};

const deleteFollow = async (userId, targetUserId) => {
  const follow = await prisma.follow.delete({
    where: {
      follower_id_following_id: {
        follower_id: userId,
        following_id: targetUserId,
      },
    },
  });
  return follow;
};

const deleteFollower = async (userId, targetUserId) => {
  const follow = await prisma.follow.delete({
    where: {
      follower_id_following_id: {
        follower_id: targetUserId,
        following_id: userId,
      },
    },
  });
  return follow;
};
export default {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
  deleteFollower,
};
