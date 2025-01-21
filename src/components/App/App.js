import React, { Component } from 'react';
import './App.css';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todoListOriginal: [],
      filter: 'all',
      idTaskEdit: null,
      intervalActive: null,
    };
  }

  filterList = (list = []) => {
    const { filter } = this.state;
    if (filter === 'active') return list.filter((task) => !task.completed);
    if (filter === 'completed') return list.filter((task) => task.completed);
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
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return {
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };

  addTaskInput = (label = '', minutes = 0, seconds = 0) => {
    const id = Math.floor(Math.random() * 9999);
    const newTask = {
      name: label,
      id,
      completed: false,
      change: false,
      min: minutes,
      sec: seconds,
      timer: false,
      flagInterval: false,
    };
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

  filterActive = () => {
    this.setState(({ todoListOriginal }) => {
      const updatedFilterActive = todoListOriginal.filter((task) => !task.completed);
      return {
        todoList: updatedFilterActive,
        filter: 'active',
      };
    });
  };

  filterComplete = () => {
    this.setState(({ todoListOriginal }) => {
      const updatedFilterComplete = todoListOriginal.filter((task) => task.completed);
      return {
        todoList: updatedFilterComplete,
        filter: 'completed',
      };
    });
  };

  filterAll = () => {
    this.setState(({ todoListOriginal }) => {
      return {
        todoList: [...todoListOriginal],
        filter: 'all',
      };
    });
  };

  onChangeTask = (id = 0) => {
    this.setState(({ todoListOriginal }) => {
      const updatedList = todoListOriginal.map((task) => (task.id === id ? { ...task, change: !task.change } : task));
      return {
        idTaskEdit: id,
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
      };
    });
  };

  changeTask = (label = '') => {
    this.setState(({ todoListOriginal, idTaskEdit }) => {
      const updatedListName = todoListOriginal.map((task) =>
        idTaskEdit === task.id ? { ...task, name: label, change: !task.change } : task
      );

      return {
        idTaskEdit: null,
        todoList: this.filterList(updatedListName),
        todoListOriginal: updatedListName,
      };
    });
  };

  onTimerOn = (id = 0) => {
    this.setState(
      ({ todoListOriginal, intervalActive }) => {
        if (intervalActive) {
          clearInterval(intervalActive);
        }

        const updatedList = todoListOriginal.map((task) =>
          task.id === id ? { ...task, timer: !task.timer, flagInterval: false } : task
        );

        return {
          todoList: this.filterList(updatedList),
          todoListOriginal: updatedList,
          intervalActive: null,
        };
      },
      () => {
        const targetTask = this.state.todoListOriginal.find((task) => task.id === id);

        if (targetTask && targetTask.timer && !targetTask.flagInterval && !targetTask.completed) {
          const intervalId = setInterval(() => {
            this.setState(({ todoListOriginal }) => {
              const updatedList = todoListOriginal.map((task) => {
                if (task.id === id) {
                  if (task.sec > 0) {
                    return { ...task, sec: task.sec - 1, flagInterval: true };
                  } else if (task.min > 0) {
                    return { ...task, sec: 59, min: task.min - 1, flagInterval: true };
                  } else {
                    clearInterval(intervalId);
                    return { ...task, timer: false, flagInterval: false };
                  }
                }
                return task;
              });

              return {
                todoList: this.filterList(updatedList),
                todoListOriginal: updatedList,
              };
            });
          }, 1000);

          this.setState({ intervalActive: intervalId });
        }
      }
    );
  };
  componentWillUnmount() {
    if (this.state.intervalActive) {
      clearInterval(this.state.intervalActive);
    }
  }

  onTimerOff = (id = 0) => {
    this.setState(({ todoListOriginal, intervalActive }) => {
      if (intervalActive) {
        clearInterval(intervalActive);
      }
      const updatedList = todoListOriginal.map((task) =>
        task.id === id ? { ...task, timer: !task.timer, flagInterval: false } : task
      );

      return {
        todoList: this.filterList(updatedList),
        todoListOriginal: updatedList,
        intervalActive: null,
      };
    });
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
            onTimerOn={this.onTimerOn}
            onTimerOff={this.onTimerOff}
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

App.defaultProps = {
  todoList: [],
  todoListOriginal: [],
};
