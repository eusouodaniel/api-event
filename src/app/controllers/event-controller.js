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
    const events = await EventService.find(req.body);

    return res.json({
      responseCode: events ? 200 : 500,
      response: events || 'Fails when search',
    });
  }

  async timeline(req, res) {
    const events = await EventService.timeline(req.body);

    return res.json({
      responseCode: events ? 200 : 500,
      response: events || 'Fails when search',
    });
  }
}

export default new EventController();
