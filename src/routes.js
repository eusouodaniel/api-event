import { Router } from 'express';
import EventController from './app/controllers/event-controller';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);
routes.post('/events', EventController.store);
routes.get('/events', EventController.find);

export default routes;
