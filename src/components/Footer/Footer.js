import React, { Component } from 'react';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

export default class Footer extends Component {
  render() {
    const { todoListOriginal, onClearComplete, filterActive, filterAll, filterComplete } = this.props;
    const todoCount = todoListOriginal.filter((item) => !item.completed).length;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filterActive={filterActive} filterAll={filterAll} filterComplete={filterComplete} />
        <button type="submit" className="clear-completed" onClick={onClearComplete}>
          Clear completed
        </button>
      </footer>
    );
  }
}
