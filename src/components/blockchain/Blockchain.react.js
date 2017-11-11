const React = require('react');
const reactCreateClass = require('create-react-class');
const BlockchainStore = require('../../stores/BlockchainStore');
const TransactionDetails = require('./TransactionDetails.react');

function getBlockchainInfo() {
  return {
    transactions: BlockchainStore.getInfo(),
  };
}
const Blockchain = reactCreateClass({
  getInitialState() {
    return getBlockchainInfo();
  },
  componentDidMount() {
    BlockchainStore.addChangeListener(this.onChange);
  },
  componentWillUnmount() {
    BlockchainStore.removeChangeListener(this.onChange);
  },
  render() {
    const data = Object.values(this.state.transactions);
    let details;
    if (data[0] === 'Error') {
      details = <p className="error"> Address not exist </p>;
    } else if (data.length > 0) {
      let info;
      if (Object.values(data[0]).length > 1) {
        info = data[0].address;
      } else {
        info = data[1];
      }
      details = (
        <div>
          <p className="headings">Transactions</p>
          <div className="display-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>ADDRESS : </p>
                  </td>
                  <td>{info.address}</td>
                </tr>
                <tr>
                  <td>
                    <p>TOTAL RECEIVED :</p>
                  </td>
                  <td>{info.confirmed.received}</td>
                </tr>
                <tr>
                  <td>
                    <p>TOTAL SPENT : </p>
                  </td>
                  <td>{info.confirmed.spent}</td>
                </tr>
                <tr>
                  <td>
                    <p>TOTAL BALANCE : </p>
                  </td>
                  <td>{info.confirmed.balance}</td>
                </tr>
              </tbody>
            </table>
            <TransactionDetails transactions={info.transactions} />
          </div>
        </div>
      );
    } else {
      details = <p>Loading....</p>;
    }
    return <div>{details}</div>;
  },
  onChange() {
    this.setState({ transactions: getBlockchainInfo() });
  },
});

module.exports = Blockchain;
