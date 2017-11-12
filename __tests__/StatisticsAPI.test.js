/* eslint-env jest */

const request = require("superagent");

describe("get() using Promises", () => {
  it("should load statistics", () => {
    return request
      .get("http://52.212.29.223/proxy/https://api.blockchain.info/stats")
      .then(data => {
        expect(data.status).toEqual(200);
      });
  });
});
