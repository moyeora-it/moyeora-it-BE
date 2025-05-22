import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

const createUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('이메일과 비밀번호를 입력해주세요.');
  }
  if (password.length < 8) {
    throw new Error('비밀번호는 8자 이상으로 입력해주세요.');
  }
  if (!email.includes('@')) {
    throw new Error('이메일 형식이 올바르지 않습니다.');
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    throw new Error('이미 존재하는 이메일 입니다.');
  }
  const newUser = await prisma.user.create({
    data: { email, password },
  });
  return newUser;
};

const deleteUser = async (userId) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
  });
  return user;
};

const getUserInfo = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      posts: true,
      skills: true,
      profileImage: true,
      nickname: true,
    },
    include: {
      groups: true,
      followers: true,
      following: true,
      Rating: true,
      Waiting: true,
      Bookmarks: true,
    },
  });
  if (!user) {
    throw new Error('존재하지 않는 유저입니다.');
  }
  return user;
};

const editUserInfo = async (userId, data) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return user;
};

const checkEmailAuth = async (email, authNum) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user.emailAuthentication !== authNum) {
    throw new Error('인증번호가 일치하지 않습니다.');
  }
  return user;
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
  return;
};

export default {
  createUser,
  deleteUser,
  getUserInfo,
  editUserInfo,
  checkEmailAuth,
  login,
};
