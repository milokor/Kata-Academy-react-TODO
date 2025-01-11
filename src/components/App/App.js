import React , {Component} from 'react';
import './App.css'
import TaskList from "../TaskList/TaskList"
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends Component {

    state = {
        todoList: [
            {name: 'Task-1', id: 1},
            {name: 'Task-2', id: 2},
            {name: 'Task-3', id: 3}
        ]
    }

    onDeletedTask = (id) => {
        this.setState(({ todoList }) => {
            const updatedList = todoList.filter(task => task.id !== id);
            return { todoList: updatedList };
          });
    }

    render() {
return (
    <section className="todoapp">
            <header className="header">
            <h1>todos</h1>
            <NewTaskForm/>
            </header>
    <section className="main">
    <TaskList onDeletedTask = {this.onDeletedTask} todoList = {this.state.todoList}/>
    <Footer/>
    </section>
</section>
);
}
}

