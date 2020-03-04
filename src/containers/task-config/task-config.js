import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

import { priorityList, readinessList } from '../../constants/constants';

import LocalApi from './../../helpers/localApi';
import Helpers from './../../helpers/Helpers';

import Button from './../../components/button/button';
import ButtonsGroup from './../../components/buttons-group/buttons-group';

class TaskConfig extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        text: PropTypes.string,
        alias: PropTypes.string
      })
    ),
    params: PropTypes.shape({
      alias: PropTypes.string,
      id: PropTypes.string
    }),
    routeParams: PropTypes.shape({
      id: PropTypes.string
    }),
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        category: PropTypes.string,
        text: PropTypes.string,
        priority: PropTypes.number,
        isTaskDone: PropTypes.bool
      })
    )
  };

  static defaultProps = {
    categories: [],
    tasks: [],
    params: {
      alias: '',
      id: ''
    },
    routeParams: {
      id: ''
    }
  };

  api = new LocalApi();
  Helpers = new Helpers();

  componentWillMount() {
    this.updateData();
  }

  updateTaskText = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  };

  updateTaskRate = ({ target }) => {
    const taskRate = +target.getAttribute('data-value');

    this.setState({ taskRate });
  };

  updateTaskStatus = ({ target: { value } }) => {
    // Use JSON.parse for convert value to boolean
    this.setState({ isDone: JSON.parse(value) });
  };

  updateTaskCategory = ({ target: { name } }) => {
    this.setState({ activeCategory: name });
  };

  updateData = () => {
    const { tasks, routeParams } = this.props;
    const task = this.Helpers.getDataById(tasks, routeParams.id);
    const { priority, isTaskDone, text, category } = task;

    this.setState({
      taskRate: priority,
      isDone: isTaskDone,
      inputValue: text,
      activeCategory: category
    });
  };

  saveChanges = () => {
    const { taskRate, isDone, inputValue, activeCategory } = this.state;
    const { tasks, routeParams } = this.props;
    const task = this.Helpers.getDataById(tasks, routeParams.id);

    task.priority = taskRate;
    task.isTaskDone = isDone;
    task.text = inputValue;
    task.category = activeCategory;

    this.api.updateTask(task);
    browserHistory.goBack();
    toastr.success('Tasks updated', { timeOut: 3000 });
  };

  render() {
    let categories = this.api.getCategories();
    const { taskRate, inputValue, isDone, activeCategory } = this.state;
    const { params } = this.props;

    categories = categories.map((category, index) =>
      category.userId === params.alias ? (
        <div className="radio" key={index}>
          <label>
            <input onChange={this.updateTaskCategory} type="radio" name={category.alias} checked={activeCategory === category.alias} />
            {category.text}
          </label>
        </div>
      ) : null
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-offset-2 col-lg-8">
            <div className="panel edit-task-panel">
              <div className="panel-heading">
                <h4 className="title">
                  <i className="material-icons">settings</i>
                  <span>EDIT TASK:</span>
                </h4>
              </div>
              <div className="panel-body">
                <div className="row margin-bottom">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-5 col-md-4">
                        <h5 className="priority text-left">Change Priority:</h5>
                      </div>
                      <div className="col-lg-7 col-md-8 text-left">
                        <ButtonsGroup specialClass="priority">
                          {priorityList.map(({ title, id }, index) => (
                            <Button key={id} onClickFunction={this.updateTaskRate} dataValue={`${index + 1}`} specialClass={`btn alert-${id}`} checkActive={taskRate}>
                              {title}
                            </Button>
                          ))}
                        </ButtonsGroup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row margin-bottom">
                  <div className="col-lg-5 col-md-4">
                    <h5 className="priority text-left">Change Description:</h5>
                  </div>
                  <div className="col-lg-7 col-md-8 text-left">
                    <textarea className="form-control" rows="2" id="textArea" value={inputValue} onChange={this.updateTaskText} autoFocus />
                    <span className="help-block">Update your task description</span>
                  </div>
                </div>
                <div className="row margin-bottom">
                  <div className="col-lg-5 col-md-4">
                    <h5 className="priority text-left">Change readiness:</h5>
                  </div>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="col-lg-12 col-md-8 text-left">
                        <form>
                          {readinessList.map(({ value, title }, index) => (
                            <div key={index} className="radio">
                              <label>
                                <input onChange={this.updateTaskStatus} type="radio" checked={value ? isDone : !isDone} name="optionsRadios" value={`${value}`} />
                                {title}
                              </label>
                            </div>
                          ))}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-md-4">
                    <h5 className="priority text-left">Change category:</h5>
                  </div>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="col-lg-12 col-md-8 text-left">
                        <form>{categories}</form>
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClickFunction={this.saveChanges} specialClass="btn btn-primary save-changes">
                  <i className="material-icons">check</i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ categories, tasks }) => ({
  categories,
  tasks
}))(TaskConfig);
