import React, { Component } from 'react';

import Task from '../Task/Task';

import './TaskList.css';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
  static propTypes = {
    todoList: PropTypes.array,
  };

  render() {
    const { todoList, onDeletedTask, onStatusClick, onChangeTask, changeTask, onTimerOn, onTimerOff } = this.props;
    const taskParse = todoList.map(({ id, name, completed, change, min, sec }) => {
      return (
        <Task
          key={id}
          id={id}
          name={name}
          onDeleteTask={() => onDeletedTask(id)}
          onStatusClick={() => onStatusClick(id)}
          completed={completed}
          change={change}
          onChangeTask={() => onChangeTask(id)}
          changeTask={changeTask}
          min={min}
          sec={sec}
          onTimerOn={() => onTimerOn(id)}
          onTimerOff={() => onTimerOff(id)}
        />
      );
    });
    return <ul className="todo-list">{taskParse}</ul>;
  }
}

TaskList.defaultProps = {
  todoList: [],
  onDeletedTask: () => {},
  onStatusClick: () => {},
  onChangeTask: () => {},
  changeTask: () => {},
  onTimerOn: () => {},
  onTimerOff: () => {},
};
