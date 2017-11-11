const React = require('react');
const reactCreateClass = require('create-react-class');
const BlockchainAPI = require('../../utils/BlockchainAPI');

const TransactionDetails = reactCreateClass({
  getInitialState() {
    return { transactions: Object.values(this.props.transactions) };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ transactions: nextProps.transactions });
  },
  render() {
    const data = this.state.transactions;
    let details;
    console.log(data);
    if (data.length !== 0) {
      details = data.map((e, i) => (
        <div
          key={i}
          className="small-container"
          onClick={this.onClick.bind(null, e.outputs[0].addresses)}
        >
          <div>Transaction #{i + 1}</div>
          <br />
          <table>
            <tbody>
              <tr>
                <td>Time :</td>
                <td>{e.time}</td>
              </tr>
              <tr>
                <td>Amount :</td>
                <td>{e.output_amount}</td>
              </tr>
              <tr>
                <td>Address :</td>
                <td>{e.outputs[0].addresses}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ));
    }
    return (
      <div>
        <h4>Transaction Details</h4>
        {details}
      </div>
    );
  },
  onClick(e) {
    window.history.pushState(null, null, `${e[0]}`);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
    BlockchainAPI.get(e[0]);
  },
});

module.exports = TransactionDetails;
