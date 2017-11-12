const React = require("react");
const reactCreateClass = require("create-react-class");
const Statistics = require("./Statistics.react");
const WAValidator = require("wallet-address-validator");

const Dashboard = reactCreateClass({
  getInitialState() {
    return {
      hash: " ",
      error: false
    };
  },
  render() {
    let errorMsg = " ";
    let dynamicstyle;
    if (this.state.error) {
      errorMsg = <p className="error-message"> This is not a valid address </p>;
      dynamicstyle = "error-style";
    }
    return (
      <div>
        <Statistics />
        <div className="container">
          <p className="headings">Blockchain address</p>
          <form onSubmit={this.handleSubmit}>
            {errorMsg}
            <input
              autoFocus
              className={dynamicstyle}
              type="search"
              id="search"
              placeholder="Search..."
              value={this.state.hash}
              onChange={this.handleChange}
            />
            <button> Search</button>
          </form>
        </div>
      </div>
    );
  },
  handleChange(e) {
    this.setState({ hash: e.target.value.replace(/\s/g, "") });
  },
  handleSubmit(e) {
    const valid = WAValidator.validate(this.state.hash, "bitcoin");
    if (valid) {
      window.history.pushState(null, null, `blockchain/${this.state.hash}`);
      window.dispatchEvent(new window.PopStateEvent("popstate"));
    } else {
      this.setState({ error: true });
    }
    e.preventDefault();
  }
});

module.exports = Dashboard;
