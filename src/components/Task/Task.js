import React from 'react';
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

function Task ({props}) {
  return (
    <li className="completed">
    <div className="view">
      <input className="toggle" type="checkbox"/>
      <label>
        <span className="description">Completed task</span>
        <span className="created">{formatDistanceToNow(new Date(), {})}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
    </li>
  );
}

export default Task