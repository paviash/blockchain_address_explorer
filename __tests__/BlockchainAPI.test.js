/* eslint-env jest */

const BlockchainStore = require("../src/stores/BlockchainStore");
const BlockchainAPI = require("../src/utils/BlockchainAPI");
const hashsample = "1BvvRfz4XnxSWJ524TusetYKrtZnAbgV3r";
BlockchainAPI.get(hashsample);

function getBlockchainInfo() {
  return BlockchainStore.getHash();
}
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
let hash;
describe("get() using Promises", () => {
  it("should check hash", () => {
    sleep(500).then(() => {
      hash = getBlockchainInfo();
      return expect(hash).toEqual(hashsample);
    });
  });
});
