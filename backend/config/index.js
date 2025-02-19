import { ENV_VARS } from './envVars.js';

export default {
  minPasswordLength: 6,
  saltRounds: 10,
  tokenExpIn: '1d',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, //1d
    httpOnly: true,
    sameSite: 'strict',
    secure: ENV_VARS.NODE_ENV !== 'development',
  },
};
