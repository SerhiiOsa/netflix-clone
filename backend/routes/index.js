import express from 'express';

import protectRoute from '../midleware/protectRoute.js';

import authRoutes from './auth.route.js';
import movieRoutes from './movie.route.js';
import tvRoutes from './tv.route.js';
import searchRoutes from './search.route.js';

const router = express.Router();

router.use('/auth', authRoutes);

router.use(protectRoute);
router.use('/movie', movieRoutes);
router.use('/tv', tvRoutes);
router.use('/search', searchRoutes);

export default router;
