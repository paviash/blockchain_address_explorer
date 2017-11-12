const React = require("react");
const reactCreateClass = require("create-react-class");
const BlockchainAPI = require("../utils/BlockchainAPI");
const StatisticsAPI = require("../utils/StatisticsAPI");
const Blockchain = require("./blockchain/Blockchain.react");
const Dashboard = require("./dashboard/Dashboard.react");

const MainComponent = reactCreateClass({
  // getInitialState() {
  //   return { hash: "home" };
  // },
  render() {
    let page;
    function router(props) {
      const key = props.path;
      if (key === "/") {
        StatisticsAPI.get();
        page = <Dashboard />;
      } else if (/blockchain/.test(key)) {
        const param = props.path.replace("/blockchain/", "");
        BlockchainAPI.get(param);
        page = <Blockchain hash={param} />;
      } else {
        page = <p> OOPS</p>;
      }
    }
    router(this.props);
    return (
      <div>
        <header onClick={this.onClickHome.bind(null, "/")}>
          <div className="title">Blockchain Explorer</div>
        </header>
        {page}
      </div>
    );
  },
  onClickHome(e) {
    window.history.pushState(null, null, e);
    window.dispatchEvent(new window.PopStateEvent("popstate"));
  }
});

module.exports = MainComponent;
