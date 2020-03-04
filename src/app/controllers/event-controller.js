import EventService from '../services/event-service';

class EventController {
  async store(req, res) {
    const validationFields = await EventService.validationFields(req.body);

    if (validationFields === 400) {
      return res.status(400).json({ error: 'Validation field fails' });
    }

    const event = await EventService.store(req.body);

    return res.json({
      responseCode: event ? 200 : 500,
      response: event || 'Fails when created',
    });
  }

  async find(req, res) {
    return res.json({
      responseCode: 200,
    });
  }
}

export default new EventController();
