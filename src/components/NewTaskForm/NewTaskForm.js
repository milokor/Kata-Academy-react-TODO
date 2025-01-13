import React , {Component} from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: ''
  }  

  onNewTask = (e) => {
   this.setState(() => {
     return {
      label: e.target.value
     }
   })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.label.trim()) {
      this.props.addTaskInput(this.state.label)
      this.setState(() => {
        return {
         label: ''
        }
      })
    }
  }
  render() {
  return (
     <form onSubmit={this.onSubmit}>
  <input type='text' 
  className="new-todo" 
  placeholder="What needs to be done?" 
  autoFocus 
  value={this.state.label}
  onChange={this.onNewTask}
  />
  </form>);
  }
}

