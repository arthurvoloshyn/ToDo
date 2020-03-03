import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import Button from './../../components/button/button';
import ButtonsGroup from './../../components/buttons-group/buttons-group';
import LocalApi from './../../helpers/localApi';
import Helpers from './../../helpers/Helpers';

class TaskConfig extends Component {
  api = new LocalApi();
  Helpers = new Helpers();

  componentWillMount() {
    this.updateData();
  }

  updateTaskText = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  };

  updateTaskRate = ({ target }) => {
    const priority = +target.getAttribute('data-value');
    this.setState({ taskRate: priority });
  };

  updateTaskStatus = ({ target: { value } }) => {
    // Use JSON.parse for conver value to boolean
    this.setState({ isDone: JSON.parse(value) });
  };

  updateTaskCategory = ({ target: { name } }) => {
    this.setState({ activeCategory: name });
  };

  updateData = () => {
    const { tasks, routeParams } = this.props;
    const task = this.Helpers.getTask(tasks, routeParams.id);
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
    const task = this.Helpers.getTask(this.props.tasks, this.props.routeParams.id);
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

    categories = categories.map((category, index) =>
      category.userId === this.props.params.alias ? (
        <div className="radio" key={index}>
          <label>
            <input onChange={evt => this.updateTaskCategory(evt)} type="radio" name={category.alias} checked={activeCategory === category.alias} />
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
                          <Button onClickFunction={this.updateTaskRate} dataValue="1" specialClass={`btn alert-danger`} checkActive={taskRate}>
                            Hight
                          </Button>
                          <Button onClickFunction={this.updateTaskRate} dataValue="2" specialClass={`btn alert-warning`} checkActive={taskRate}>
                            Middle
                          </Button>
                          <Button onClickFunction={this.updateTaskRate} dataValue="3" specialClass={`btn alert-success`} checkActive={taskRate}>
                            Low
                          </Button>
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
                    <textarea className="form-control" rows="2" id="textArea" value={inputValue} onChange={evt => this.updateTaskText(evt)} autoFocus></textarea>
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
                          <div className="radio">
                            <label>
                              <input onChange={evt => this.updateTaskStatus(evt)} type="radio" checked={isDone} name="optionsRadios" value="true" />
                              Done
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input onChange={evt => this.updateTaskStatus(evt)} type="radio" checked={!isDone} name="optionsRadios" value="false" />
                              Not Done
                            </label>
                          </div>
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

TaskConfig.propTypes = {
  categories: PropTypes.array,
  params: PropTypes.object,
  routeParams: PropTypes.object,
  tasks: PropTypes.array
};

export default connect(({ categories, tasks }) => ({
  categories,
  tasks
}))(TaskConfig);
