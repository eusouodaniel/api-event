import * as Yup from 'yup';

class StoreEvent {
  async create(body) {
    const schema = Yup.object().shape({
      event: Yup.string().required(),
    });

    return schema.isValid(body);
  }
}

export default new StoreEvent();
