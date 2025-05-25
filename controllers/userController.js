import userService from '../services/userService.js';
import { sendEmailAuth } from '../config/SMTP.js';
import {
  accessTokenOption,
  refreshTokenOption,
  clearAccessTokenOption,
  clearRefreshTokenOption,
} from '../config/cookie.js';

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser(email, password);
    res.status(201).json({ success: true, message: '회원가입 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//회원 탈퇴
const deleteUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    await userService.deleteUser(parseInt(userId));
    res.status(204).json({ success: true, message: '회원 탈퇴 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const userInfo = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const user = await userService.getUserInfo(userId);
    res
      .status(200)
      .json({ success: true, message: '유저 정보 조회 성공', items: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getByUserId(parseInt(userId));
    res
      .status(200)
      .json({ success: true, message: '유저 정보 조회 성공', items: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editUserInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const image = req.file ? req.file.location : undefined;
    const { nickname, position, newPassword, confirmPassword } = req.body;
    let skills = req.body.skills;

    if (skills) {
      // 쉼표로 구분된 문자열을 Skill enum 배열로 변환
      skills = skills.split(',').map((skill) => skill.trim());
    }

    const user = await userService.editUserInfo(
      parseInt(id),
      nickname,
      position,
      skills,
      newPassword,
      confirmPassword,
      image
    );
    res.status(200).json({ success: true, message: '유저 정보 수정 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const FindEmailAuth = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await sendEmailAuth(email);
    res
      .status(200)
      .json({ success: true, message: '이메일 인증 메일 발송 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const checkEmailAuth = async (req, res) => {
  const { email, authNum } = req.body;
  try {
    await userService.checkEmailAuth(email, authNum);
    res.status(200).json({ success: true, message: '이메일 인증 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await userService.login(email, password);
    const user = await userService.getUserByEmail(email);
    const accessToken = await userService.createAccessToken(user);
    const refreshToken = await userService.createAccessToken(user, 'refresh');

    res.cookie('accessToken', accessToken, accessTokenOption);
    res.cookie('refreshToken', refreshToken, refreshTokenOption);
    res.status(200).json({ success: true, message: '로그인 성공', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('accessToken', null, clearAccessTokenOption);
    res.cookie('refreshToken', null, clearRefreshTokenOption);
    res.status(200).json({ success: true, message: '로그아웃 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  const { id, email } = req.user;
  const user = { id, email };
  try {
    const newAccessToken = await userService.createAccessToken(user);
    res.cookie('accessToken', newAccessToken, accessTokenOption);
    res.status(200).json({ success: true, message: '액세스 토큰 갱신 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const redisToLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     await userService.redisToLogin(email, password);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export default {
  signup,
  deleteUser,
  userInfo,
  getByUserId,
  editUserInfo,
  FindEmailAuth,
  checkEmailAuth,
  login,
  refreshAccessToken,
  logout,
};
