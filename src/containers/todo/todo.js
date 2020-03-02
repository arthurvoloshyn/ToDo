import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import TasksList from './../tasks-list/tasks-list';
import Categories from './../../components/categories/categories';
import localApi from './../../helpers/localApi';
import { addTask, deleteTask, updateTask, changeTaskText, addCategory, deleteCategory, updateCategory, changeActiveCategory, changeCategoryName } from './../../actions/actionCreators';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.api = new localApi();

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.doneTask = this.doneTask.bind(this);
  }

  addTask(data) {
    let { params, activeCategory, taskText, addTask, changeTaskText } = this.props;

    const taskInit = {
      userId: params.alias,
      id: new Date().getTime(),
      category: activeCategory,
      text: taskText,
      priority: data.inputRate || 3,
      isTaskDone: false
    };
    if (taskText.length <= 5) {
      toastr.warning('Very short task name', { timeOut: 4000 });
    } else {
      addTask(taskInit.userId, taskInit.id, taskInit.category, taskInit.text, taskInit.priority, taskInit.isTaskDone);
      this.api.addTask(taskInit);
      changeTaskText('');
    }
  }

  deleteTask(task) {
    let { tasks, deleteTask } = this.props;
    const deletedTask = tasks.filter(item => item.id === task.id)[0];
    deleteTask(deletedTask);
    this.api.deleteTask(deletedTask);
    toastr.info('Tasks deleted', { timeOut: 2000 });
  }

  doneTask(index, task) {
    let { tasks, updateTask } = this.props;
    const doneTask = tasks.filter(item => item.id === task.id)[0];
    doneTask.isTaskDone = !doneTask.isTaskDone;
    updateTask(doneTask);
    this.api.updateTask(doneTask);
  }

  render() {
    let { categories, categoryName, activeCategory, addCategory, deleteCategory, updateCategory, changeActiveCategory, changeCategoryName, tasks, params } = this.props;

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

Todo.propTypes = {
  activeCategory: PropTypes.string,
  addCategory: PropTypes.func,
  addTask: PropTypes.func,
  categories: PropTypes.array,
  categoryName: PropTypes.string,
  changeActiveCategory: PropTypes.func,
  changeCategoryName: PropTypes.func,
  changeTaskText: PropTypes.func,
  deleteCategory: PropTypes.func,
  deleteTask: PropTypes.func,
  params: PropTypes.object,
  taskText: PropTypes.string,
  tasks: PropTypes.array,
  updateCategory: PropTypes.func,
  updateTask: PropTypes.func,
  users: PropTypes.array
};

export default connect(
  state => ({
    activeCategory: state.activeCategory,
    categories: state.categories,
    categoryName: state.categoryName,
    taskText: state.taskText,
    tasks: state.tasks,
    users: state.users
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
