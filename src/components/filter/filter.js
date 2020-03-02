import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './../../components/button/button';
import ButtonsGroup from './../../components/buttons-group/buttons-group';
import LocalApi from './../../helpers/localApi';
import Helpers from './../../helpers/Helpers';

class Filter extends Component {
  state = {
    activeView: 3
  };

  api = new LocalApi();

  Helpers = new Helpers();

  UNSAFE_componentWillMount() {
    this.setState({
      activeView: this.isActive()
    });
  }

  isActive = () => {
    const { users, alias } = this.props;
    const activeUser = this.Helpers.getActiveUser(users, alias);
    return activeUser.settings[0].activeView;
  };

  isShowDone = () => {
    const { users, alias } = this.props;
    const activeUser = this.Helpers.getActiveUser(users, alias);
    return activeUser.settings[1].showDone ? 'active' : '';
  };

  updateView = ({ target }) => {
    const { users, alias, updateUser } = this.props;
    const priority = +target.getAttribute('data-value');
    const activeUser = this.Helpers.getActiveUser(users, alias);
    activeUser.settings[0].activeView = priority;
    updateUser(activeUser);
    this.api.updateUser(activeUser);
    this.setState({
      activeView: priority
    });
  };

  showDoneTasks = () => {
    const { users, alias, updateUser } = this.props;
    const activeUser = this.Helpers.getActiveUser(users, alias);
    activeUser.settings[1].showDone = !activeUser.settings[1].showDone;
    updateUser(activeUser);
    this.api.updateUser(activeUser);
  };

  render() {
    let { alias, tasks, users, activeCategory } = this.props;
    const activeUser = this.Helpers.getActiveUser(users, alias);
    const activeView = activeUser.settings[0].activeView;

    const danger = [];
    const warning = [];
    const success = [];
    const all = [];

    tasks = tasks.filter(({ userId }) => userId === alias);

    tasks.forEach(task => {
      if (!task.isTaskDone && task.category === activeCategory) {
        all.push(task);
        switch (task.priority) {
          case 1:
            danger.push(task);
            break;
          case 2:
            warning.push(task);
            break;
          case 3:
            success.push(task);
            break;
          default:
            return null;
        }
      }
    });

    return (
      <div className="panel panel-default filter-panel">
        <div className="panel-heading">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-9 text-left">
              <h4 className="title">
                <i className="material-icons">filter_list</i>
                <span>FILTER:</span>
              </h4>
              <ButtonsGroup specialClass={'filter'} activeElem={activeView}>
                <Button onClickFunction={this.updateView} dataValue="1" specialClass={`btn alert-danger`} checkActive={this.state.activeView}>
                  Hight {<span className="badge">{danger.length}</span>}
                </Button>
                <Button onClickFunction={this.updateView} dataValue="2" specialClass={`btn alert-warning`} checkActive={this.state.activeView}>
                  Middle {<span className="badge">{warning.length}</span>}
                </Button>
                <Button onClickFunction={this.updateView} dataValue="3" specialClass={`btn alert-success`} checkActive={this.state.activeView}>
                  Low {<span className="badge">{success.length}</span>}
                </Button>
                <Button onClickFunction={this.updateView} specialClass={`btn btn-all`} dataValue="4" checkActive={this.state.activeView}>
                  All <span className="badge">{all.length}</span>
                </Button>
              </ButtonsGroup>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 text-right">
              <Button onClickFunction={this.showDoneTasks} specialClass={`btn btn-done-tasks ${this.isShowDone()}`}>
                Done tasks
                <i className="material-icons">{`${this.isShowDone() === 'active' ? 'visibility' : 'visibility_off'}`}</i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  activeCategory: PropTypes.string,
  alias: PropTypes.string,
  tasks: PropTypes.array,
  updateUser: PropTypes.func,
  users: PropTypes.array
};

export default Filter;
