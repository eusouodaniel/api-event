import { Router } from 'express';
import EventController from './app/controllers/event-controller';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

/**
 *  @swagger
 * /events:
 *   post:
 *     tags:
 *     - "Save events"
 *     summary: "Add new event"
 *     description: "Add new event"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Add evnt, must have only event"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           event:
 *              type: "string"
 *     responses:
 *       200:
 *         description: "Event added Successfully"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Ops... something wrong happened"
 */
routes.post('/events', EventController.store);

/**
 *  @swagger
 * /events:
 *   post:
 *     tags:
 *     - "Get events"
 *     summary: "Get event"
 *     description: "Get event"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Get event, must have only event"
 *       required: true
 *       schema:
 *         type: "object"
 *         properties:
 *           event:
 *              type: "string"
 *     responses:
 *       200:
 *         description: "Successfully"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Ops... something wrong happened"
 */
routes.get('/events', EventController.find);

export default routes;
