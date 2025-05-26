import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { client } from '../config/redis.js';

dotenv.config();

const accessVerifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const springUserId = req.headers['x-user-id'];

    if (authHeader && springUserId) {
      const token = authHeader.split(' ')[1];

      const userAuth = await client.get(`auth:${springUserId}`);
      if (userAuth) {
        const userData = JSON.parse(userAuth);
        if (userData.accessToken !== token) {
          return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
        }
        req.user = {
          id: springUserId,
          email: userData.email,
        };
        return next();
      }
    }

    // Spring 토큰이 아닌 경우 Node 토큰 검증
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

const refreshVerifyToken = async (req, res, next) => {
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

    // JWT 토큰 검증
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Spring에서 발급한 토큰인지 확인 (Redis에 저장된 토큰인지 확인)
    const userAuth = await client.get(String(decoded.userId));

    if (userAuth) {
      // Redis에 데이터가 있다면 Spring 토큰 검증
      const userData = JSON.parse(userAuth);
      if (userData.refreshToken !== token) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
      }
    }
    // Redis에 데이터가 없다면 Node 토큰으로 간주하고 일반 검증 진행

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
