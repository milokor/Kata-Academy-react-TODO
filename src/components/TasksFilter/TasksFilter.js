import React, { Component } from 'react';

import './TasksFilter.css';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: 'All',
    };
  }

  onClickSelected = (buttonId = '') => {
    this.setState({ activeButton: buttonId });
  };

  render() {
    const { filterActive, filterAll, filterComplete } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            type="submit"
            className={this.state.activeButton === 'All' ? 'selected' : ''}
            onClick={() => {
              filterAll();
              this.onClickSelected('All');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="submit"
            className={this.state.activeButton === 'Active' ? 'selected' : ''}
            onClick={() => {
              filterActive();
              this.onClickSelected('Active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="submit"
            className={this.state.activeButton === 'Completed' ? 'selected' : ''}
            onClick={() => {
              filterComplete();
              this.onClickSelected('Completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  filterActive: () => {},
  filterAll: () => {},
  filterComplete: () => {},
};
