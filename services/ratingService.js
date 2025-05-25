import ratingRepository from '../repositorys/ratingRepository.js';

const createRating = async (ratedUserId, rate, userId) => {
  const rating = await ratingRepository.createRating(ratedUserId, rate, userId);
  return rating;
};

const editRating = async (ratingId, rate, userId) => {
  const rating = await ratingRepository.editRating(ratingId, rate, userId);
  return rating;
};

const getRating = async (ratedUserId) => {
  const rating = await ratingRepository.getRating(ratedUserId);
  return rating;
};

const deleteRating = async (userId) => {
  const rating = await ratingRepository.deleteRating(userId);
  return rating;
};

export default {
  createRating,
  editRating,
  getRating,
  deleteRating,
};
