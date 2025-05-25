import prisma from '../config/prisma.js';

const createRating = async (ratedUserId, rate, userId) => {
  const checkRatingUser = await prisma.rating.findFirst({
    where: {
      rated_user_id: ratedUserId,
      rater_id: userId,
    },
  });

  if (checkRatingUser) {
    throw new Error('이미 평점을 남겼습니다.');
  }

  const rating = await prisma.rating.create({
    data: {
      rater_id: userId,
      rating: rate,
      rated_user_id: ratedUserId,
    },
  });
  return rating;
};

const editRating = async (ratingId, rate, userId) => {
  const checkRating = await prisma.rating.findUnique({
    where: {
      id: ratingId,
    },
  });
  if (!checkRating) {
    throw new Error('평점을 찾을 수 없습니다.');
  }
  if (checkRating.rater_id !== userId) {
    throw new Error('평점을 수정할 권한이 없습니다.');
  }
  const rating = await prisma.rating.update({
    where: { id: ratingId },
    data: { rating: rate },
  });
  return rating;
};

const getRating = async (ratedUserId) => {
  const ratings = await prisma.rating.findMany({
    where: {
      rated_user_id: ratedUserId,
    },
    select: {
      rating: true,
    },
  });

  const sum = ratings.reduce((acc, current) => acc + current.rating, 0);
  const average =
    ratings.length > 0 ? Math.round((sum / ratings.length) * 10) / 10 : 0;

  return { ratings, average };
};

const deleteRating = async (userId) => {
  // 먼저 평점이 존재하는지 확인
  const checkRating = await prisma.rating.findMany({
    where: { rated_user_id: userId },
  });

  if (checkRating.length === 0) {
    throw new Error('삭제할 평점을 찾을 수 없습니다.');
  }

  const rating = await prisma.rating.deleteMany({
    where: { rated_user_id: userId },
  });
  return rating;
};

export default {
  createRating,
  editRating,
  getRating,
  deleteRating,
};
