import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config/index.js';
import { ENV_VARS } from '../../config/envVars.js';

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(config.saltRounds);
  return await bcryptjs.hash(password, salt);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: config.tokenExpIn,
  });
};

export const isCorrectPassword = async (password, hashedPassword) => {
  return await bcryptjs.compare(password, hashedPassword);
};

export const decodeToken = (token) => {
  return jwt.verify(token, ENV_VARS.JWT_SECRET);
};
