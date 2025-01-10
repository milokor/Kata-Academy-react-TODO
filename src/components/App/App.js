import React from 'react';
import './App.css'
import TaskList from "../TaskList/TaskList"
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

function App() {
return (
    <section className="todoapp">
            <header className="header">
            <h1>todos</h1>
            <NewTaskForm/>
            </header>
    <section className="main">
    <TaskList/>
    <Footer/>
    </section>
</section>
);
}

export default App;
