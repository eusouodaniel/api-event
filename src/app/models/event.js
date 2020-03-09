class Event {
  event() {
    return {
      timestamp: '',
      revenue: 0.0,
      transaction_id: '',
      store_name: '',
      products: [],
    };
  }
}

export default new Event();
