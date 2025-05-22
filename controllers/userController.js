import userService from '../services/userServies.js';
import { sendEmailAuth } from '../config/SMTP.js';

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//회원 탈퇴
const deleteUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    await userService.deleteUser(userId);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userInfo = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUserInfo = async (req, res) => {
  const { id: userId } = req.user;
  const { password, nickname, profileImage, position, skills } = req.body;

  const data = {
    password,
    nickname,
    profileImage,
    position,
    skills,
  };
  try {
    const user = await userService.editUserInfo(userId, data);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const FindEmailAuth = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await sendEmailAuth(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Email auth error:', error); // 에러 로깅 추가
    res.status(500).json({ message: error.message });
  }
};

const checkEmailAuth = async (req, res) => {
  const { email, authNum } = req.body;
  try {
    const result = await userService.checkEmailAuth(email, authNum);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await userService.login(email, password);
    res.status(200).json('로그인 성공');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default {
  signup,
  deleteUser,
  userInfo,
  editUserInfo,
  FindEmailAuth,
  checkEmailAuth,
  login,
};
