const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const EventEmitter = require('events').EventEmitter;
const _ = require('underscore');

let store = {};
let hash = ' ';

function loadBlockchainData(data) {
  store = data[0];
  hash = data[1];
}

const BlockchainStore = _.extend({}, EventEmitter.prototype, {
  getInfo() {
    return store;
  },
  getHash() {
    return hash;
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
    case AppConstants.GET_INFO:
      loadBlockchainData(action.data);
      break;
    default:
      return true;
  }
  BlockchainStore.emitChange();
  return true;
});

module.exports = BlockchainStore;
