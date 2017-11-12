const AppActions = require("../actions/AppActions");
const request = require("superagent");

module.exports = {
  get(hash) {
    let outcome;
    if (hash) {
      request
        .get(`https://api.smartbit.com.au/v1/blockchain/address/${hash}`)
        // .get(
        //   `http://52.212.29.223/proxy/https://blockchain.info/rawaddr/${hash}`
        // )
        .set("Accept", "application/json")
        .end((err, response) => {
          if (response.status === 200) {
            AppActions.getBlockchainInfo([response.body, hash]);
          } else {
            AppActions.getBlockchainInfo(["Error", hash]);
          }
        });

      outcome = true;
    } else {
      outcome = false;
    }
    return outcome;
  }
};
