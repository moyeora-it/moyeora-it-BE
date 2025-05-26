import jwt from 'jsonwebtoken';
import { client } from '../config/redis.js';
import dotenv from 'dotenv';

dotenv.config();

const saveUserAuthToRedis = async (userId, userData) => {
  const key = `auth:${userId}`;
  await client.set(key, JSON.stringify(userData));
  await client.expire(key, 3600);
};

const handleSpringAuth = async (userId, email, token) => {
  // JWT 토큰 생성
  const accessToken = jwt.sign({ userId, email }, process.env.TOKEN_SECRET, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({ userId, email }, process.env.TOKEN_SECRET, {
    expiresIn: '7d',
  });

  // Redis에 저장
  await saveUserAuthToRedis(userId, {
    userId,
    email,
    accessToken,
    refreshToken,
    expiresIn: 3600,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export default {
  handleSpringAuth,
};
