import StoreEvent from '../controllers/rules/store-event';
import Event from '../schemas/event';

class EventService {
  async store(req) {
    const event = await Event.create({
      event: req.event,
    });

    return event;
  }

  async find(req) {
    const event = await Event.find({
      event: req.query,
    });

    return event;
  }

  async validationFields(req) {
    if (!(await StoreEvent.create(req))) {
      return 400;
    }

    return 200;
  }
}

export default new EventService();
