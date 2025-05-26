import authService from '../services/authService.js';
import { client } from '../config/redis.js';

/**
{
  "userId": 5,
  "email": "user@example.com",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTc0ODE5MzkxMCwiZXhwIjoxNzQ4MjA0NzEwfQ.rKS1buJaMN8HLJlUCs1SyQnKCoqyNPsnhE2EEpLPjY"
}
 */
const handleSpringAuth = async (req, res) => {
  try {
    const { userId, email, token } = req.body;

    const result = await authService.handleSpringAuth(userId, email, token);

    await client.set(String(userId), JSON.stringify(result));

    // 쿠키에 토큰 저장
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: '인증 정보 저장 성공',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export default {
  handleSpringAuth,
};
