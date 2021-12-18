import express from 'express';

import UsersController from './controllers/UsersController';
import LessonsController from './controllers/LessonsController';
import AuthMiddleware from './shared/middlewares/AuthMiddleware';
import CorsMiddleware from './shared/middlewares/CorsMiddleware';

const usersController = new UsersController();
const lessonsController = new LessonsController();

const router = express.Router();

router.use(CorsMiddleware);
router.use(AuthMiddleware);

router.get('/ping', (_req, res) => res.json({ success: true, message: 'pong' }));

router.post('/users', usersController.store);
router.get('/users', usersController.show);
router.post('/users/login', usersController.login);

router.get('/lessons', lessonsController.index);
router.get('/lessons/:id', lessonsController.get);
router.get('/lessons/show', lessonsController.show);
router.post('/lessons', lessonsController.store);
router.put('/lessons/:id', lessonsController.update);
router.delete('/lessons/:id', lessonsController.delete);
router.post('/lessons/like/:id', lessonsController.like);

export default router;
