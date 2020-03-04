import StoreEvent from './rules/store-event';
import Event from '../schemas/event';

class EventService {
  async store(req) {
    const event = await Event.create({
        event: req.event
    });

    return event;
  }

  async validationFields(req) {
    if (!(await StoreEvent.create(req))) {
      return 400;
    }
  }

}

export default new EventService();
