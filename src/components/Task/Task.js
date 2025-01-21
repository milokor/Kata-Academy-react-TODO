import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
    this.inputRef = React.createRef();
  }

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    completed: PropTypes.bool,
    change: PropTypes.bool,
    onDeleteTask: PropTypes.func,
    onStatusClick: PropTypes.func,
    onChangeTask: PropTypes.func,
    onTimerOn: PropTypes.func,
    onTimerOff: PropTypes.func,
    min: PropTypes.number,
    sec: PropTypes.number,
    changeTask: PropTypes.func,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscPress);
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscPress);
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleEscPress = (e) => {
    if (e.key === 'Escape' && this.props.change) {
      this.props.onChangeTask();
    }
  };

  handleOutsideClick = (e) => {
    if (this.props.change && this.inputRef.current && !this.inputRef.current.contains(e.target)) {
      this.props.onChangeTask();
    }
  };

  onNewTaskChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onChangeTaskEvent = (e) => {
    e.preventDefault();
    if (this.state.label.trim()) {
      this.props.changeTask(this.state.label);
      this.setState({ label: '' });
      this.props.onChangeTask();
    }
  };

  render() {
    const { name, id, onDeleteTask, onStatusClick, completed, change, onChangeTask, min, sec, onTimerOn, onTimerOff } =
      this.props;

    const statusTask = completed ? 'completed' : change ? 'editing' : '';

    return (
      <li className={statusTask} id={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onStatusClick} />
          <label>
            <span className="title" onClick={onStatusClick}>
              {name}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={onTimerOn}></button>
              <button className="icon icon-pause" onClick={onTimerOff}></button>
              {min}:{sec}
            </span>
            <span className="description">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={onChangeTask} />
          <button className="icon icon-destroy" onClick={onDeleteTask} />
        </div>

        {change && (
          <form onSubmit={this.onChangeTaskEvent}>
            <input
              type="text"
              className="edit"
              value={this.state.label}
              onChange={this.onNewTaskChange}
              ref={this.inputRef}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  name: '',
  id: 0,
  completed: false,
  change: false,
  min: 0,
  sec: 0,
};
