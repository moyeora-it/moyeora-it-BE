import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const accessVerifyToken = (req, res, next) => {
  try {
    const cookieStr = req.headers.cookie;
    if (!cookieStr) {
      return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    const cookies = cookieStr.split(';').map((cookie) => cookie.trim());
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('accessToken=')
    );

    if (!accessTokenCookie) {
      return res.status(401).json({ message: '액세스 토큰이 없습니다.' });
    }

    const token = accessTokenCookie.split('=')[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = {
      id: decoded.userId, // userController에서 사용하는 형식에 맞춤
      email: decoded.email,
    };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '토큰이 만료되었습니다.' });
    }
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

const refreshVerifyToken = (req, res, next) => {
  try {
    const cookieStr = req.headers.cookie;
    if (!cookieStr) {
      return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    const cookies = cookieStr.split(';').map((cookie) => cookie.trim());
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken=')
    );

    if (!refreshTokenCookie) {
      return res.status(401).json({ message: '리프레시 토큰이 없습니다.' });
    }

    const token = refreshTokenCookie.split('=')[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '토큰이 만료되었습니다.' });
    }
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export default { accessVerifyToken, refreshVerifyToken };
