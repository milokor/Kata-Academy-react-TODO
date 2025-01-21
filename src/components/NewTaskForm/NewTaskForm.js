import React, { Component } from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { label, minutes, seconds } = this.state;
    if (minutes === '' && seconds === '') {
      minutes = 30;
      seconds = 0;
    }
    if (isNaN(parseInt(seconds)) || isNaN(parseInt(minutes))) return;
    if (!label.trim()) return;
    this.props.addTaskInput(label, parseInt(minutes), parseInt(seconds));
    this.setState({ label: '', seconds: '', minutes: '' });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          name="label"
          className="new-todo"
          placeholder="Task"
          value={this.state.label}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <input
          name="minutes"
          className="new-todo-form__timer"
          value={this.state.minutes}
          onChange={this.handleChange}
          placeholder="Min"
          onKeyDown={this.handleKeyDown}
        />
        <input
          name="seconds"
          className="new-todo-form__timer"
          value={this.state.seconds}
          onChange={this.handleChange}
          placeholder="Sec"
          onKeyDown={this.handleKeyDown}
        />
      </form>
    );
  }
}
