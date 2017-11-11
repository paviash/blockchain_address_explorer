const AppActions = require("../actions/AppActions");
const request = require("superagent");

module.exports = {
  get(hash) {
    if (hash) {
      request
        .get(`https://api.smartbit.com.au/v1/blockchain/address/${hash}`)
        .set("Accept", "application/json")
        .end((err, response) => {
          if (response.status === 200) {
            AppActions.getBlockchainInfo([response.body, hash]);
          } else {
            console.log(`Error${err}`);
          }
          return true;
        });
    } else {
      console.log("No hash value");
    }
  }
};
