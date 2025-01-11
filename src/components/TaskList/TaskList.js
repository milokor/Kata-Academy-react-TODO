import React, {Component} from 'react';

import Task from '../Task/Task';

import './TaskList.css'

export default class TaskList extends Component {

    render() {
        const {todoList, onDeletedTask} = this.props
        const taskParse = todoList.map(({id, name}) => {
            return <Task 
             key = {id}
             id = {id} 
             name = {name}
             onDeleteTask = {() => onDeletedTask(id)}/>
           })
    return (
        <ul className="todo-list">
         {taskParse}
        </ul>
    );
}
}
