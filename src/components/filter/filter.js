import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LocalApi from './../../helpers/localApi';
import Helpers from './../../helpers/Helpers';

import Button from './../../components/button/button';
import ButtonsGroup from './../../components/buttons-group/buttons-group';

class Filter extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    alias: PropTypes.string,
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
    updateUser: PropTypes.func,
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
    alias: '',
    updateUser: () => {},
    tasks: [],
    users: []
  };

  state = {
    activeView: 3
  };

  api = new LocalApi();

  Helpers = new Helpers();

  componentWillMount() {
    this.setState({
      activeView: this.isActive()
    });
  }

  isActive = () => {
    const { users, alias } = this.props;
    const activeUser = this.Helpers.getDataByAlias(users, alias);

    return activeUser.settings[0].activeView;
  };

  isShowDone = () => {
    const { users, alias } = this.props;
    const activeUser = this.Helpers.getDataByAlias(users, alias);

    return activeUser.settings[1].showDone ? 'active' : '';
  };

  updateView = ({ target }) => {
    const { users, alias, updateUser } = this.props;
    const priority = +target.getAttribute('data-value');
    const activeUser = this.Helpers.getDataByAlias(users, alias);

    activeUser.settings[0].activeView = priority;
    updateUser(activeUser);

    this.api.updateUser(activeUser);

    this.setState({
      activeView: priority
    });
  };

  showDoneTasks = () => {
    const { users, alias, updateUser } = this.props;
    const activeUser = this.Helpers.getDataByAlias(users, alias);

    activeUser.settings[1].showDone = !activeUser.settings[1].showDone;
    updateUser(activeUser);

    this.api.updateUser(activeUser);
  };

  render() {
    let { alias, tasks, users, activeCategory } = this.props;
    const { activeView: stateActiveView } = this.state;
    const activeUser = this.Helpers.getDataByAlias(users, alias);
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

    const filterList = [
      { value: danger, title: 'Hight', id: 'alert-danger' },
      { value: warning, title: 'Middle', id: 'alert-warning' },
      { value: success, title: 'Low', id: 'alert-success' },
      { value: all, title: 'All', id: 'btn-all' }
    ];

    return (
      <div className="panel panel-default filter-panel">
        <div className="panel-heading">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-9 text-left">
              <h4 className="title">
                <i className="material-icons">filter_list</i>
                <span>FILTER:</span>
              </h4>
              <ButtonsGroup specialClass="filter" activeElem={activeView}>
                {filterList.map(({ value, title, id }, index) => (
                  <Button key={id} onClickFunction={this.updateView} dataValue={`${index + 1}`} specialClass={`btn ${id}`} checkActive={stateActiveView}>
                    {title} {<span className="badge">{value.length}</span>}
                  </Button>
                ))}
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

export default Filter;
