const React = require("react");
const reactCreateClass = require("create-react-class");
const AddressList = require("./AddressList.react");
const Timestamp = require("react-timestamp");

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
    if (data.length !== 0) {
      details = data.map((e, i) => (
        <div key={i} className="small-container">
          <div>
            Transaction #{i + 1} : Created at
            <Timestamp time={e.time} format="full" /> | Amount:
            {e.output_amount} to address(es) :
          </div>
          <br />
          <AddressList address={e.outputs} />
        </div>
      ));
    }
    return (
      <div>
        <h4>Transaction Details</h4>
        {details}
      </div>
    );
  }
});

module.exports = TransactionDetails;
