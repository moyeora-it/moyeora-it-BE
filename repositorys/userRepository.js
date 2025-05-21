import prisma from '../config/prisma.js';

const createUser = async (email, password) => {
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

export default { createUser };
