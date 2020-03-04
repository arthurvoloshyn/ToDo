import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import LocalApi from './../../helpers/localApi';
import Helpers from '../../helpers/Helpers';

import { addTask, deleteTask, updateTask, changeTaskText, addCategory, deleteCategory, updateCategory, changeActiveCategory, changeCategoryName } from './../../actions/actionCreators';

import Categories from './../../components/categories/categories';

import TasksList from './../tasks-list/tasks-list';

class Todo extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    addCategory: PropTypes.func,
    addTask: PropTypes.func,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        text: PropTypes.string,
        alias: PropTypes.string
      })
    ),
    categoryName: PropTypes.string,
    changeActiveCategory: PropTypes.func,
    changeCategoryName: PropTypes.func,
    changeTaskText: PropTypes.func,
    deleteCategory: PropTypes.func,
    deleteTask: PropTypes.func,
    params: PropTypes.shape({
      alias: PropTypes.string,
      id: PropTypes.string
    }),
    taskText: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        category: PropTypes.string,
        text: PropTypes.string,
        priority: PropTypes.number,
        isTaskDone: PropTypes.bool
      })
    ),
    updateCategory: PropTypes.func,
    updateTask: PropTypes.func,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['ADD_USER']),
        id: PropTypes.number,
        avatar: PropTypes.string,
        name: PropTypes.string,
        alias: PropTypes.string,
        settings: PropTypes.arrayOf(
          PropTypes.shape({
            activeView: PropTypes.number,
            showDone: PropTypes.bool
          })
        )
      })
    )
  };

  static defaultProps = {
    activeCategory: 'default',
    categoryName: '',
    categories: [],
    params: {
      alias: '',
      id: ''
    },
    taskText: '',
    tasks: [],
    users: [],
    addCategory: () => {},
    addTask: () => {},
    changeActiveCategory: () => {},
    changeCategoryName: () => {},
    changeTaskText: () => {},
    deleteCategory: () => {},
    deleteTask: () => {},
    updateCategory: () => {},
    updateTask: () => {}
  };

  Helpers = new Helpers();
  api = new LocalApi();

  addTask = ({ inputRate }) => {
    const { params, activeCategory, taskText, addTask, changeTaskText } = this.props;

    const taskInit = {
      userId: params.alias,
      id: new Date().getTime(),
      category: activeCategory,
      text: taskText,
      priority: inputRate || 3,
      isTaskDone: false
    };
    if (taskText.length <= 5) {
      toastr.warning('Very short task name', { timeOut: 4000 });
    } else {
      const { userId, id, category, text, priority, isTaskDone } = taskInit;

      addTask(userId, id, category, text, priority, isTaskDone);

      this.api.addTask(taskInit);

      changeTaskText('');
    }
  };

  deleteTask = ({ id }) => {
    const { tasks, deleteTask } = this.props;
    const deletedTask = this.Helpers.getDataById(tasks, id);

    deleteTask(deletedTask);

    this.api.deleteTask(deletedTask);

    toastr.info('Tasks deleted', { timeOut: 2000 });
  };

  doneTask = (index, task) => {
    const { tasks, updateTask } = this.props;
    const doneTask = this.Helpers.getDataById(tasks, task.id);
    const newDoneTask = { ...doneTask, isTaskDone: !doneTask.isTaskDone };

    updateTask(newDoneTask);
    this.api.updateTask(newDoneTask);
  };

  render() {
    const { categories, categoryName, activeCategory, addCategory, deleteCategory, updateCategory, changeActiveCategory, changeCategoryName, tasks, params } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-offset-0 col-lg-5 col-md-offset-2 col-md-8">
            <Categories
              alias={params.alias}
              categories={categories}
              categoryName={categoryName}
              activeCategory={activeCategory}
              addCategory={addCategory}
              deleteCategory={deleteCategory}
              updateCategory={updateCategory}
              changeActiveCategory={changeActiveCategory}
              changeCategoryName={changeCategoryName}
              tasks={tasks}
              deleteTask={deleteTask}
            />
          </div>
          <div className="col-lg-offset-0 col-lg-7 col-md-offset-2 col-md-8">
            <TasksList alias={params.alias} deleteTask={this.deleteTask} doneTask={this.doneTask} addTask={this.addTask} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ activeCategory, categories, categoryName, taskText, tasks, users }) => ({
    activeCategory,
    categories,
    categoryName,
    taskText,
    tasks,
    users
  }),
  {
    addTask,
    deleteTask,
    updateTask,
    changeTaskText,
    addCategory,
    deleteCategory,
    updateCategory,
    changeActiveCategory,
    changeCategoryName
  }
)(Todo);
