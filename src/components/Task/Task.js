import React, {Component} from 'react';
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

export default class Task extends Component {
  state = {
    completed: false,
  };

  onLabelClick = (e) => {
       this.setState((prevState) =>  { 
        return {
        completed: !prevState.completed
      }
    })
  }


  render() {
    const {completed} = this.state
    const {name, id, onDeleteTask} = this.props
        const statusTask = completed ? 'completed' : ''
     return (

      <li className={statusTask} id = {id}>
      <div className="view">
      <input className="toggle" type="checkbox" checked = {completed} onChange={this.onLabelClick}/>
      <label onClick={this.onLabelClick}>
        <span className="description">{name}</span>
        <span className="created">{formatDistanceToNow(new Date(), {})}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick = {onDeleteTask}></button>
    </div>
    </li>
    )
  }
  
}