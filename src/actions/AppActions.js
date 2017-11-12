const AppDispatcher = require("../dispatcher/AppDispatcher");
const AppConstants = require("../constants/AppConstants");

module.exports = {
  getBlockchainStats(Info) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_STATS,
      data: Info
    });
  },
  getBlockchainInfo(Info) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_INFO,
      data: Info
    });
  }
};
