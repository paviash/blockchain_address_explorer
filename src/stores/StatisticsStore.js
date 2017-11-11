const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

let store = {};
function loadBlockchainStats(data) {
  store = data;
}

const StatisticsStore = _.extend({}, EventEmitter.prototype, {
  getStats() {
    return store;
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },
});
AppDispatcher.register((payload) => {
  const action = payload.action;
  switch (action.actionType) {
    case AppConstants.GET_STATS:
      loadBlockchainStats(action.data);
      break;
    default:
      return true;
  }
  StatisticsStore.emitChange();
  return true;
});

module.exports = StatisticsStore;
