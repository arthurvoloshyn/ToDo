import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import LocalApi from '~/helpers/localApi';
import Helpers from '~/helpers/Helpers';

import {
  addTask,
  deleteTask,
  updateTask,
  changeTaskText,
  addCategory,
  deleteCategory,
  updateCategory,
  changeActiveCategory,
  changeCategoryName
} from '~/actions/actionCreators';

import Categories from '~/components/categories/categories';

import TasksList from '../tasks-list/tasks-list';

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
    const { addTask: addTaskApi } = this.api;

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

      addTaskApi(taskInit);

      changeTaskText('');
    }
  };

  deleteTask = id => {
    const { tasks, deleteTask } = this.props;
    const { getDataById } = this.Helpers;
    const { deleteTask: deleteTaskApi } = this.api;

    const deletedTask = getDataById(tasks, id);

    toastr.confirm('Are you sure that you want to delete this task', {
      onOk: () => {
        deleteTask(deletedTask.id);

        deleteTaskApi(deletedTask.id);

        toastr.info('Task deleted', { timeOut: 2000 });
      }
    });
  };

  doneTask = id => {
    const { tasks, updateTask } = this.props;
    const { getDataById } = this.Helpers;
    const { updateTask: updateTaskApi } = this.api;

    const doneTask = getDataById(tasks, id);
    const taskStatus = !doneTask.isTaskDone;
    const {
      id: doneTaskId,
      category: doneTaskCategory,
      priority: doneTaskPriority,
      text: doneTaskText,
      userId: doneTaskUserId
    } = doneTask;

    updateTask(doneTaskId, doneTaskCategory, taskStatus, doneTaskPriority, doneTaskText);
    updateTaskApi(
      doneTaskId,
      doneTaskCategory,
      taskStatus,
      doneTaskPriority,
      doneTaskText,
      doneTaskUserId
    );
  };

  render() {
    const {
      categories,
      categoryName,
      activeCategory,
      addCategory,
      deleteCategory,
      updateCategory,
      changeActiveCategory,
      changeCategoryName,
      tasks,
      params
    } = this.props;
    const currentCategories = categories.filter(({ userId }) => userId === params.alias);

    return (
      <div className="container">
        <div className="row">
          <section className="col-lg-offset-0 col-lg-5 col-md-offset-2 col-md-8">
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
              currentCategories={currentCategories}
            />
          </section>
          {currentCategories.length > 0 && (
            <section className="col-lg-offset-0 col-lg-7 col-md-offset-2 col-md-8">
              <TasksList
                alias={params.alias}
                deleteTask={this.deleteTask}
                doneTask={this.doneTask}
                addTask={this.addTask}
              />
            </section>
          )}
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
