const AppActions = require("../actions/AppActions");
const request = require("superagent");

module.exports = {
  get() {
    request
      .get("http://52.212.29.223/proxy/https://api.blockchain.info/stats")
      .set("Accept", "application/json")
      .end((err, response) => {
        if (response.status === 200) {
          AppActions.getBlockchainStats(response.body);
        } else {
          console.log(`Error${err}`);
        }
      });
    return true;
  }
};
