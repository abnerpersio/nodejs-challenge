import express from 'express';
import CorsMiddleware from './shared/middlewares/CorsMiddleware';

const router = express.Router();

router.use(CorsMiddleware);

router.get('users');

export default router;
