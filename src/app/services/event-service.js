import axios from 'axios';
import StoreEvent from '../controllers/rules/store-event';
import Event from '../schemas/event';
import EventModel from '../models/event';
import ProductModel from '../models/product';

class EventService {
  async store(req) {
    const event = await Event.create({
      event: req.event,
    });

    return event;
  }

  async find(req) {
    // Added 'i' for case-insensitive
    const event = await Event.find({
      event: { $regex: req.query, $options: 'i' },
    });

    return event;
  }

  async timeline() {
    await axios
      .get(`https://storage.googleapis.com/dito-questions/events.json`)
      // eslint-disable-next-line func-names
      .then(function(response) {
        const timeline = [];
        const event = EventModel.event();
        const product = ProductModel.product();

        const events = new Map();
        response.events.forEach(result => {
          const id = this.customData(result.custom_data, 'transaction_id');

          if (events.has(id)) {
            const arrEvents = events.get(id);
            arrEvents.push(event);
            events.set(id, arrEvents);
          } else events.set(id, [event]);
        });

        const results = [];
        events.forEach(result =>
          results.push(this.buildTimeline(timeline, result, event, product))
        );

        // eslint-disable-next-line no-unused-vars
        Promise.all(results).then(_ => {
          timeline.sort((x, y) =>
            // eslint-disable-next-line no-nested-ternary
            x.timestamp < y.timestamp ? 1 : y.timestamp < x.timestamp ? -1 : 0
          );
          return timeline;
        });
      });
    return null;
  }

  async customData(data, key) {
    return data.filter(filter => filter.key === key).shift().value;
  }

  async buildTimeline(timeline, events, event, product) {
    return new Promise((resolve, reject) => {
      try {
        event.products = [];

        events.forEach(result => {
          this.targetingOrchestrator(event, product, result);
        });

        timeline.push({ ...event });
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  targetingOrchestrator(event, product, result) {
    // Defining names for comparison to avoid hard code
    const BOUGHT = 'comprou';
    const PURCHASED_PRODUCT = 'comprou-produto';

    // Orchestrating shipping and building
    if (event.event === BOUGHT) {
      event = this.buildBought(event, result);
    } else if (event.event === PURCHASED_PRODUCT) {
      event = this.buildPurchasedProduct(event, product, result);
    }
    return event;
  }

  async buildBought(event, result) {
    event.timestamp = result.timestamp;
    event.revenue = result.revenue;
    event.transaction_id = this.customData(
      result.custom_data,
      'transaction_id'
    );
    event.store_name = this.customData(result.custom_data, 'store_name');
    return event;
  }

  async buildPurchasedProduct(event, product, result) {
    product.name = this.customData(result.custom_data, 'product_name');
    product.price = this.customData(result.custom_data, 'product_price');
    event.products.push({ ...product });
    return event;
  }

  async purchasedProduct(event, result) {
    event.timestamp = result.timestamp;
    event.revenue = result.revenue;
    event.transaction_id = this.customData(
      result.custom_data,
      'transaction_id'
    );
    event.store_name = this.customData(result.custom_data, 'store_name');
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
