import express from 'express';

import UserController from './controllers/UserController';
import AuthMiddleware from './shared/middlewares/AuthMiddleware';
import CorsMiddleware from './shared/middlewares/CorsMiddleware';

const router = express.Router();

router.use(CorsMiddleware);
router.use(AuthMiddleware);

router.get('/ping', (req, res) => res.json({ success: true, message: 'pong' }));

router.get('/users', UserController.create);

export default router;
