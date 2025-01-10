import React from 'react';
import Task from '../Task/Task';
import './TaskList.css'
function TaskList () {
    return (
        <ul className="todo-list">
         <Task />
        </ul>
    );
}

export default TaskList