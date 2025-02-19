import {
  generateToken,
  hashPassword,
  isCorrectPassword,
  isValidEmail,
} from '../lib/utils/index.js';
import User from '../models/user.model.js';
import config from '../config/index.js';

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Al fields are required' });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' });
    }

    if (password.length < config.minPasswordLength) {
      return res.status(400).json({
        success: false,
        message: `Password must be at least ${config.minPasswordLength} characters long`,
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: `Username ${username} is already taken`,
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: `Email ${email} is already used`,
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();

      const token = generateToken(newUser._id);
      res.cookie('jwt', token, config.cookie);

      res
        .status(201)
        .json({ success: true, user: { ...newUser._doc, password: '' } });
    }
  } catch (error) {
    console.error('Error in signup controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Al fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    if (!(await isCorrectPassword(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.cookie('jwt', token, config.cookie);

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: '' } });
  } catch (error) {
    console.error('Error in login controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error('Error in authCheck controller: ', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
