const AppActions = require('../actions/AppActions');
const request = require('superagent');

module.exports = {
  get() {
    request
      .get('https://api.smartbit.com.au/v1/blockchain/stats')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (response.status === 200) {
          AppActions.getBlockchainStats(response.body);
        } else {
          console.log(`Error${err}`);
        }
      });
    return true;
  },
};
