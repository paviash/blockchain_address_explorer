const React = require('react');
const reactCreateClass = require('create-react-class');
const StatisticsStore = require('../../stores/StatisticsStore');

function getBlockchainStats() {
  return {
    blockchain_stats: StatisticsStore.getStats(),
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
    let statDetails;
    if (data.length !== 0) {
      const statistics = data[0].stats;
      if (statistics) {
        statDetails = (
          <div className="column-container">
            <p>BLOCK COUNT </p>
            <p>{statistics.block_count}</p>
            <p>HASH RATE</p>
            <p>{statistics.hash_rate}</p>
            <p>TRANSACTION COUNT</p>
            <p>{statistics.transaction_count}</p>
          </div>
        );
      }
    }
    return (
      <div>
        <p className="headings">Blockchain Statistics</p>
        {statDetails}
      </div>
    );
  },
  onChange() {
    this.setState({ blockchain_stats: getBlockchainStats() });
  },
});

module.exports = Statistics;
