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
      id: true,
      email: true,
      nickname: true,
      profile_image: true,
      position: true,
      skills: true,
      group: true,
      followers: true,
      following: true,
      rating: true,
      waiting_list: true,
      bookmark: true,
      reply: true,
      _count: true,
    },
  });

  if (!user) {
    throw new Error('존재하지 않는 유저입니다.');
  }

  return { items: user };
};

const editUserInfo = async (
  id,
  nickname,
  position,
  skills,
  newPassword,
  confirmPassword,
  image
) => {
  if (newPassword || confirmPassword) {
    if (!newPassword || !confirmPassword) {
      throw new Error('새 비밀번호와 확인 비밀번호를 모두 입력해주세요.');
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { password: true },
    });

    if (!currentUser) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      confirmPassword,
      currentUser.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error('현재 비밀번호가 일치하지 않습니다.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    newPassword = hashedNewPassword;
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      nickname,
      position,
      skills,
      ...(newPassword && { password: newPassword }),
      ...(image && { profile_image: image }),
    },
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
  if (!user) {
    throw new Error('존재하지 않는 이메일입니다.');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
  return;
};

const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
    },
  });
  return user;
};

const getByUserId = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};
export default {
  createUser,
  deleteUser,
  getUserInfo,
  editUserInfo,
  checkEmailAuth,
  login,
  getUserByEmail,
  getByUserId,
  getUserByEmail,
};
