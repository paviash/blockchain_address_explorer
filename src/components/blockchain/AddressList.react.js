const React = require("react");
const reactCreateClass = require("create-react-class");
const BlockchainAPI = require("../../utils/BlockchainAPI");

const AddressList = reactCreateClass({
  getInitialState() {
    return { address: Object.values(this.props.address) };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ address: nextProps.address });
  },
  render() {
    let addresses;
    const add = this.state.address.map(function(obj) {
      return obj.addresses.toString();
    });
    const data = add.filter(function(e) {
      return e.replace(/(\r\n|\n|\r)/gm, "");
    });
    const uniqueItems = data.filter((v, i, a) => a.indexOf(v) === i);

    if (uniqueItems.length !== 0) {
      addresses = uniqueItems.map((item, i) => (
        <p
          key={item}
          className="click-container"
          onClick={this.onClickAddress.bind(null, item)}
        >
          {item}
        </p>
      ));
    }
    return <div>{addresses}</div>;
  },
  onClickAddress(e) {
    window.history.pushState(null, null, `${e}`);
    window.dispatchEvent(new window.PopStateEvent("popstate"));
  }
});

module.exports = AddressList;
