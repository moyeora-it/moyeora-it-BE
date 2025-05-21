import userRepository from '../repositorys/userRepository.js';
import bcrypt from 'bcrypt';

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(email, hashedPassword);

  return user;
};

export default { createUser };
