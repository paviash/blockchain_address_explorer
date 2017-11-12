const React = require("react");
const reactCreateClass = require("create-react-class");
const StatisticsStore = require("../../stores/StatisticsStore");

function getBlockchainStats() {
  return {
    blockchain_stats: StatisticsStore.getStats()
  };
}
const Statistics = reactCreateClass({
  getInitialState() {
    return getBlockchainStats();
  },
  componentDidMount() {
    StatisticsStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    StatisticsStore.removeChangeListener(this.onChange);
  },
  render() {
    const data = Object.values(this.state.blockchain_stats);
    let btc_mined;
    let market_price;
    let transaction_count;
    let total_blocks;

    if (data.length !== 0) {
      const statistics = data[0];
      if (statistics) {
        btc_mined = statistics.n_btc_mined;
        market_price = statistics.market_price_usd;
        transaction_count = statistics.n_tx;
        total_blocks = statistics.n_blocks_total;
      }
    }
    return (
      <div>
        <div className="column-container">
          <div>
            BTC MINED
            <p>{btc_mined}</p>
          </div>
          <div>
            MARKET PRICE USD
            <p>{market_price}</p>
          </div>
          <div>
            TRANSACTION COUNT
            <p>{transaction_count}</p>
          </div>
          <div>
            TOTAL BLOCKS
            <p>{total_blocks}</p>
          </div>
        </div>
      </div>
    );
  },
  onChange() {
    this.setState({ blockchain_stats: getBlockchainStats() });
  }
});

module.exports = Statistics;
