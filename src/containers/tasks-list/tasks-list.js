import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProgressBar from '../../components/progress-bar/progress-bar';
import Button from './../../components/button/button';
import ButtonsGroup from './../../components/buttons-group/buttons-group';
import InputField from './../../components/input-field/input-field';
import Filter from './../../components/filter/filter';
import Task from './../../components/task-item/task-item';
import { changeTaskText, updateUser } from './../../actions/actionCreators';

class TasksList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputRate: 3
    };

    this.updateRateValue = this.updateRateValue.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.sortTasksOrder = this.sortTasksOrder.bind(this);
  }

  updateRateValue(evt) {
    this.setState({ inputRate: +evt.target.getAttribute('data-value') });
  }

  updateInputValue(evt) {
    this.props.changeTaskText(evt.target.value);
  }

  sortTasksOrder (tasksArray) {
    tasksArray.sort((a, b) => a.priority - b.priority);
    let notDoneTasksArray = tasksArray.filter(task => !task.isTaskDone);
    let doneDasksArray = tasksArray.filter(task => task.isTaskDone);
    return tasksArray = [...notDoneTasksArray, ...doneDasksArray];
  }

  render() {
    let { users, addTask, taskText, activeCategory, categories, tasks, alias, doneTask, deleteTask, updateUser } = this.props;
    let categoryName = categories.filter(category => category.alias === activeCategory);
    categoryName = categoryName.length ? categoryName[0].text : '';
    const activeView = users.filter(user => user.alias === alias)[0].settings[0].activeView;
    const showDone = users.filter(user => user.alias === alias)[0].settings[1].showDone;

    tasks = this.sortTasksOrder(tasks.filter(task => task.userId === alias));
    let tasksList = [];

    showDone ?
    tasksList = tasks.map((task, index) => {
      if(task.priority === activeView && task.category === activeCategory || activeView === 4 && task.category === activeCategory) {
        return <Task key={index} index={index} task={task} tasks={tasks} alias={alias} doneTask={doneTask} deleteTask={deleteTask} />;
      }
    }) :
    tasksList = tasks.map((task, index) => {
      if(task.priority === activeView && !task.isTaskDone && task.category === activeCategory || activeView === 4 && !task.isTaskDone && task.category === activeCategory) {
        return <Task key={index} index={index} task={task} tasks={tasks} alias={alias} doneTask={doneTask} deleteTask={deleteTask} />;
      }
    });

    return (
      <div>
        <div className="panel panel-default add-panel">
          <div className="panel-heading tasks-panel">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text-left">
                <h4 className="title">
                  <i className="material-icons">list</i>
                  <span>{`${categoryName} tasks:`}</span>
                </h4>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
                <InputField
                  value={taskText}
                  changeFunction={this.updateInputValue}
                  data={this.state}
                  addFunction={addTask}
                  placeholder={`Click to add new task...`}
                />
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-5 text-left">
                <ButtonsGroup
                  specialClass="priority"
                  activeElem={this.state.inputRate}
                >
                  <Button
                    onClickFunction={this.updateRateValue}
                    dataValue="1"
                    specialClass={`btn alert-danger`}
                    checkActive={this.state.inputRate}
                  >Hight</Button>
                  <Button
                    onClickFunction={this.updateRateValue}
                    dataValue="2"
                    specialClass={`btn alert-warning`}
                    checkActive={this.state.inputRate}
                  >Middle</Button>
                  <Button
                    onClickFunction={this.updateRateValue}
                    dataValue="3"
                    specialClass={`btn alert-success`}
                    checkActive={this.state.inputRate}
                  >Low</Button>
                </ButtonsGroup>
              </div>
            </div>
          </div>
        </div>
        <ProgressBar
          alias={alias}
          tasksList={tasks}
          activeCategory={activeCategory}
        />
        <div className="panel panel-body tasks-list">
          {tasksList}
        </div>
        <Filter
          alias={alias}
          tasks={tasks}
          users={users}
          activeCategory={activeCategory}
          updateUser={updateUser}
        />
      </div>
    );
  }
}

TasksList.propTypes = {
  activeCategory: PropTypes.string,
  addTask: PropTypes.func,
  alias: PropTypes.string,
  categories: PropTypes.array,
  changeTaskText: PropTypes.func,
  deleteTask: PropTypes.func,
  doneTask: PropTypes.func,
  taskText: PropTypes.string,
  tasks: PropTypes.array,
  updateUser: PropTypes.func,
  users: PropTypes.array
};

export default connect(state => ({
  activeCategory: state.activeCategory,
  categories: state.categories,
  taskText: state.taskText,
  tasks: state.tasks,
  users: state.users
}), { changeTaskText, updateUser })(TasksList);
