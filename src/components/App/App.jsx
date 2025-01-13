import React, { Component } from "react";
import "./App.css";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";

export default class App extends Component {
  state = {
    todoList: [],
    todoListOriginal: [],
    filter: "all",
    idTaskEdit: null,
  };

  filterList = (list = []) => {
    const { filter } = this.state;
    if (filter === "active") return list.filter((task) => !task.completed);
    if (filter === "completed") return list.filter((task) => task.completed);
    return list;
  };

  onDeletedTask = (id = 0) => {
    this.setState(({ todoListOriginal }) => {
      const updatedList = todoListOriginal.filter((task) => task.id !== id);
      return {
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };

  onStatusClick = (id = 0) => {
    this.setState(({ todoListOriginal }) => {
      const updatedList = todoListOriginal.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      );
      return {
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };

  addTaskInput = (label = "") => {
    const id = Math.floor(Math.random() * 9999);
    const newTask = { name: label, id, completed: false, change: false };
    this.setState(({ todoListOriginal }) => {
      const updatedList = [...todoListOriginal, newTask];
      return {
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };

  onClearComplete = () => {
    this.setState(({ todoListOriginal }) => {
      const updatedList = todoListOriginal.filter((task) => !task.completed);
      return {
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };

  onChangeLabel = (id = 0) => {
    this.setState(({ todoListOriginal }) => {
      const idx = todoListOriginal.findIndex((task) => task.id === id);
      const updatedList = structuredClone({
        ...todoListOriginal[idx],
        name: todoListOriginal[idx].name,
      });
      return {
        todoList: todoListOriginal.with(idx, updatedList),
        todoListOriginal: todoListOriginal.with(idx, updatedList),
      };
    });
  };

  filterActive = () => {
    this.setState(({ todoListOriginal }) => {
      const updatedFilterActive = todoListOriginal.filter(
        (task) => !task.completed,
      );
      return {
        todoList: updatedFilterActive,
        filter: "active",
      };
    });
  };

  filterComplete = () => {
    this.setState(({ todoListOriginal }) => {
      const updatedFilterComplete = todoListOriginal.filter(
        (task) => task.completed,
      );
      return {
        todoList: updatedFilterComplete,
        filter: "completed",
      };
    });
  };

  filterAll = () => {
    this.setState(({ todoListOriginal }) => {
      return {
        todoList: [...todoListOriginal],
        filter: "all",
      };
    });
  };

  onChangeTask = (id = 0) => {
    this.setState(({ todoListOriginal }) => {
      const updatedList = todoListOriginal.map((task) =>
        task.id === id ? { ...task, change: !task.change } : task,
      );

      return {
        idTaskEdit: id,
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };
  changeTask = (label = "") => {
    if (this.state.idTaskEdit === null) return;
    this.setState(({ todoListOriginal, idTaskEdit }) => {
      const updatedListName = todoListOriginal.map((task) =>
        idTaskEdit === task.id
          ? { ...task, name: (task.name = label), change: !task.change }
          : task,
      );
      return {
        idTaskEdit: null,
        todoList: this.filterList(updatedListName),
        todoListOriginal: updatedListName,
      };
    });
  };

  static defaultProps = {
    todoList: [],
    todoListOriginal: [],
  };

  render() {
    const { todoList, todoListOriginal } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTaskInput={this.addTaskInput} />
        </header>
        <section className="main">
          <TaskList
            onDeletedTask={this.onDeletedTask}
            todoList={todoList}
            onStatusClick={this.onStatusClick}
            onChangeTask={this.onChangeTask}
            changeTask={this.changeTask}
          />
          <Footer
            todoListOriginal={todoListOriginal}
            onClearComplete={this.onClearComplete}
            filterAll={this.filterAll}
            filterComplete={this.filterComplete}
            filterActive={this.filterActive}
          />
        </section>
      </section>
    );
  }
}
