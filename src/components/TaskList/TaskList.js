import React, { Component } from 'react';

import Task from '../Task/Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { todoList, onDeletedTask, onStatusClick, onChangeTask, changeTask} = this.props;
    const taskParse = todoList.map(({ id, name , completed, change }) => {
      return <Task 
      key={id}
       id={id}
        name={name}
         onDeleteTask={() => onDeletedTask(id)}
          onStatusClick = {() => onStatusClick(id)}
          completed = {completed}
          change = {change}
          onChangeTask = {() => onChangeTask(id)}
          changeTask = {changeTask}
           />;
    });
    return <ul className="todo-list">{taskParse}</ul>;
  }
}
