import userRepository from '../repositorys/userRepository.js';
import bcrypt from 'bcrypt';

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(email, hashedPassword);
  return user;
};

const deleteUser = async (userId) => {
  const user = await userRepository.deleteUser(userId);
  return user;
};

const getUserInfo = async (userId) => {
  const user = await userRepository.getUserInfo(userId);
  return user;
};

const editUserInfo = async (userId, data) => {
  const user = await userRepository.editUserInfo(userId, data);
  return user;
};

export default { createUser, deleteUser, getUserInfo, editUserInfo };
