const React = require('react');
const reactCreateClass = require('create-react-class');
const Statistics = require('./Statistics.react');

const Dashboard = reactCreateClass({
  getInitialState() {
    return {
      hash: ' ',
    };
  },
  render() {
    return (
      <div>
        <p className="headings">Blockchain address</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            id="search"
            placeholder="Search..."
            value={this.state.hash}
            onChange={this.handleChange}
          />
          <button> Search</button>
        </form>
        <Statistics />
      </div>
    );
  },
  handleChange(e) {
    this.setState({ hash: e.target.value.replace(/\s/g, '') });
  },
  handleSubmit(e) {
    window.history.pushState(null, null, `blockchain/${this.state.hash}`);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
    e.preventDefault();
  },
});

module.exports = Dashboard;
