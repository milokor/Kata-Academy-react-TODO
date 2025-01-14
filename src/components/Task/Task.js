import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    name: '',
    id: 0,
    change: false,
    todoList: [],
  };

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
    change: PropTypes.bool,
  };

  state = {
    label: '',
  };

  onNewTaskChange = (e) => {
    this.setState(() => {
      return {
        label: e.target.value,
      };
    });
  };

  onChangeTaskEvent = (e) => {
    e.preventDefault();
    if (this.state.label.trim()) {
      this.props.changeTask(this.state.label);
      this.setState(() => {
        return {
          label: '',
        };
      });
    }
  };

  render() {
    const { name, id, onDeleteTask, onStatusClick, completed, change, onChangeTask } = this.props;
    const statusTask = completed ? 'completed' : change ? 'editing' : '';

    return (
      <li className={statusTask} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onStatusClick} />
          <label onClick={onStatusClick}>
            <span className="description">{name}</span>
            <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onChangeTask} />
          <button className="icon icon-destroy" onClick={onDeleteTask} />
        </div>
        <form onSubmit={this.onChangeTaskEvent}>
          <input type="text" className="edit" value={this.state.label} onChange={this.onNewTaskChange} />
        </form>
      </li>
    );
  }
}
