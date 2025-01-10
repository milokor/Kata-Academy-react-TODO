import React from 'react';
import './App.css'
import TaskList from "../TaskList/TaskList"
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

function App() {
return (
    <section className="todoapp">
    <NewTaskForm/>
    <section className="main">
    <TaskList/>
    <Footer/>
    </section>
</section>
);
}

export default App;
