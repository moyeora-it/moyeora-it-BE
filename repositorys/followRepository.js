import prisma from '../config/prisma.js';

const getFollowers = async (userId, targetUserId, size, cursor, name) => {
  // name이 null이면 검색 조건을 제외
  const whereCondition = {
    follower_id: targetUserId,
    ...(name && {
      follower: {
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
          profile_image: true,
        },
      },
    },
  });

  // 모든 관계를 한 번에 가져오기
  const followerIds = followers.map((f) => f.following.id);
  const [followingRelations, followerRelations] = await Promise.all([
    prisma.follow.findMany({
      where: {
        follower_id: userId,
        following_id: { in: followerIds },
      },
    }),
    prisma.follow.findMany({
      where: {
        follower_id: { in: followerIds },
        following_id: userId,
      },
    }),
  ]);

  const followersWithStatus = followers.map((follower) => {
    const { profile_image, ...rest } = follower.following;
    const isFollowing = followingRelations.some(
      (rel) => rel.following_id === follower.following.id
    );
    const isFollower = followerRelations.some(
      (rel) => rel.follower_id === follower.following.id
    );

    return {
      ...rest,
      profileImage: profile_image,
      isFollower,
      isFollowing,
    };
  });

  const hasNext = followers.length === size;
  const nextCursor = hasNext ? cursor + size : null;

  return {
    items: followersWithStatus,
    cursor: nextCursor,
    hasNext,
    totalCount: followTotalCount,
  };
};

const getFollowing = async (userId, targetUserId, size, cursor, name) => {
  const whereCondition = {
    following_id: targetUserId,
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
      follower: {
        select: {
          id: true,
          email: true,
          nickname: true,
          profile_image: true,
        },
      },
    },
  });

  // 모든 관계를 한 번에 가져오기
  const followingIds = following.map((f) => f.follower.id);
  const [followingRelations, followerRelations] = await Promise.all([
    prisma.follow.findMany({
      where: {
        follower_id: userId,
        following_id: { in: followingIds },
      },
    }),
    prisma.follow.findMany({
      where: {
        follower_id: { in: followingIds },
        following_id: userId,
      },
    }),
  ]);

  const followingWithStatus = following.map((item) => {
    const { profile_image, ...rest } = item.follower;
    const isFollowing = followingRelations.some(
      (rel) => rel.following_id === item.follower.id
    );
    const isFollower = followerRelations.some(
      (rel) => rel.follower_id === item.follower.id
    );

    return {
      ...rest,
      profileImage: profile_image,
      isFollower,
      isFollowing,
    };
  });

  const hasNext = following.length === size;
  const nextCursor = hasNext ? cursor + size : null;

  return {
    items: followingWithStatus,
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

const getFollowersCount = async (userId) => {
  const followersCount = await prisma.follow.count({
    where: { follower_id: userId },
  });
  return followersCount;
};

const getFollowingCount = async (userId) => {
  const followingCount = await prisma.follow.count({
    where: { following_id: userId },
  });
  return followingCount;
};

export default {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
  deleteFollower,
  getFollowersCount,
  getFollowingCount,
};
