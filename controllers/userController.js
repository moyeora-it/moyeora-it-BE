import userService from '../services/userServies.js';

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { signup };
