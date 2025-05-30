import ratingService from '../services/ratingService.js';

const createRating = async (req, res) => {
  const { id: userId } = req.user;
  const { ratedUserId, rate } = req.body;

  try {
    if (typeof rate !== 'number' || isNaN(rate)) {
      return res.status(400).json({ message: '유효하지 않은 평점입니다.' });
    }

    const roundedRate = Math.round(rate * 10) / 10;

    if (roundedRate < 0 || roundedRate > 5) {
      return res
        .status(400)
        .json({ message: '평점은 0.0부터 5.0 사이여야 합니다.' });
    }

    const rating = await ratingService.createRating(
      parseInt(ratedUserId),
      roundedRate,
      parseInt(userId)
    );
    res.status(201).json({ success: true, message: '평점 남기기 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editRating = async (req, res) => {
  const { id: userId } = req.user;
  const { ratingId } = req.params;
  const { rate } = req.body;

  try {
    if (typeof rate !== 'number' || isNaN(rate)) {
      return res.status(400).json({ message: '유효하지 않은 평점입니다.' });
    }

    const roundedRate = Math.round(rate * 10) / 10;
    await ratingService.editRating(
      parseInt(ratingId),
      roundedRate,
      parseInt(userId)
    );
    res.status(200).json({ success: true, message: '평점 수정 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRating = async (req, res) => {
  const { ratedUserId } = req.params;

  try {
    const rating = await ratingService.getRating(parseInt(ratedUserId));
    res
      .status(200)
      .json({ success: true, message: '평점 조회 성공', items: rating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteRating = async (req, res) => {
  const { userId } = req.params;

  try {
    await ratingService.deleteRating(parseInt(userId));
    res.status(200).json({ success: true, message: '평점 삭제 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createRating,
  editRating,
  getRating,
  deleteRating,
};
