import notificationService from '../services/notificationService.js';

const getNotification = async (req, res) => {
  const { id: userId } = req.user;
  const { size, cursor } = req.query;
  try {
    const notifications = await notificationService.getNotification(
      parseInt(userId),
      parseInt(size) || 10,
      parseInt(cursor) || 0
    );
    res.status(200).json({ status: { success: true }, items: notifications });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const readNotification = async (req, res) => {
  const { id: userId } = req.user;
  const { notificationId } = req.params;
  try {
    const notification = await notificationService.readNotification(
      parseInt(userId),
      parseInt(notificationId)
    );
    res.status(200).json({
      status: { success: true, code: 200 },
    });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const deleteNotification = async (req, res) => {
  const { id: userId } = req.user;
  const { notificationId } = req.params;
  try {
    const notification = await notificationService.deleteNotification(
      parseInt(userId),
      parseInt(notificationId)
    );
    res.status(200).json({
      status: { success: true, code: 200 },
    });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const deleteAllNotification = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const notification = await notificationService.deleteAllNotification(
      parseInt(userId)
    );
    res.status(200).json({
      status: { success: true, code: 200 },
    });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const getNotificationCount = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const notificationCount = await notificationService.getNotificationCount(
      parseInt(userId)
    );
    res.status(200).json({
      status: { success: true, code: 200, count: notificationCount },
    });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

export default {
  getNotification,
  readNotification,
  deleteNotification,
  deleteAllNotification,
  getNotificationCount,
};
