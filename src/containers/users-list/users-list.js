import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';

import LocalApi from './../../helpers/localApi';
import Helpers from '../../helpers/Helpers';

import { addUser, deleteUser, addCategory, changeUserName } from './../../actions/actionCreators';

import InputField from './../../components/input-field/input-field';

class UsersList extends Component {
  static propTypes = {
    addCategory: PropTypes.func,
    addUser: PropTypes.func,
    changeUserName: PropTypes.func,
    deleteUser: PropTypes.func,
    userName: PropTypes.string,
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
    addCategory: () => {},
    addUser: () => {},
    changeUserName: () => {},
    deleteUser: () => {},
    userName: '',
    users: []
  };

  api = new LocalApi();
  Helpers = new Helpers();

  state = {
    usersAvatars: this.Helpers.getUsersAvatars(),
    avatarIndex: 0
  };

  updateUserValue = ({ target: { value } }) => {
    const { changeUserName } = this.props;

    changeUserName(value);
  };

  setTasksCounter = index => {
    const { users } = this.props;
    const alias = users[index].alias;
    const tasksValue = this.api.getUserTasks(alias);

    return tasksValue && tasksValue.length ? tasksValue.filter(({ isTaskDone }) => isTaskDone === false).length : 0;
  };

  isActive = value => {
    const { avatarIndex } = this.state;

    return value === avatarIndex ? 'active' : '';
  };

  changeUserAvatar = ({ target }) => {
    const avatarIndex = +target.getAttribute('data-index');

    this.setState({ avatarIndex });
  };

  addUser = () => {
    const { userName, addUser, addCategory, changeUserName } = this.props;
    const { usersAvatars, avatarIndex } = this.state;

    const userInit = {
      id: new Date().getTime(),
      avatar: usersAvatars[avatarIndex],
      name: userName,
      alias: `user_${new Date().getTime()}`,
      settings: [{ activeView: 4 }, { showDone: true }]
    };

    if (userName.length <= 2) {
      toastr.warning('Very short name', { timeOut: 4000 });
    } else {
      const { id, avatar, name, alias, settings } = userInit;
      const user = addUser(id, avatar, name, alias, settings);

      this.api.addUser(user);

      const categoryInit = {
        userId: userInit.alias,
        id: new Date().getTime(),
        text: 'default',
        alias: 'default'
      };

      const { userId: categoryUserId, id: categoryId, text: categoryText, alias: categoryAlias } = categoryInit;
      addCategory(categoryUserId, categoryId, categoryText, categoryAlias);

      this.api.addCategory(categoryInit);

      changeUserName('');

      toastr.success('New user successfully added', { timeOut: 3000 });
    }
  };

  deleteUser = id => {
    toastr.confirm('Are you sure that you want to delete user profile', {
      onOk: () => {
        const { deleteUser } = this.props;
        const { alias } = this.api.deleteUser(id);

        deleteUser(id);

        this.api.deleteUserTask(alias);
        this.api.deleteUserCategories(alias);
      }
    });
  };

  render() {
    const { usersAvatars } = this.state;
    const { users, userName } = this.props;

    const avatars = usersAvatars.map((avatar, i) => (
      <div key={i} className={`avatar-wrap ${this.isActive(i)}`}>
        <img onClick={this.changeUserAvatar} data-index={i} className="avatar" src={avatar} alt="avatar" />
      </div>
    ));

    const usersList = users.map(({ alias, name, avatar, id }, i) => (
      <div key={i} className="panel users__item">
        <div className="panel-body">
          <span className="label label-info active-tasks">{this.setTasksCounter(i)}</span>
          <Link to={`/users/${alias}`} className="users__avatar">
            <img src={avatar} alt={name} />
          </Link>
          <Link to={`/users/${alias}`} className="users__name">
            {name}
          </Link>
          <span onClick={() => this.deleteUser(id)} className="label label-danger delete-user">
            Delete profile
          </span>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="panel add-user-panel">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text-left">
                    <h4 className="title">
                      <i className="material-icons">account_circle</i>
                      <span>ADD NEW USER:</span>
                    </h4>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
                    <InputField value={userName} changeFunction={this.updateUserValue} addFunction={this.addUser} placeholder="click to add your full name..." maxLength="12" />
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <h5 className="user-desc">Choose your avatar:</h5>
                <div className="user-avatars-wrapper">{avatars}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="users__list">{usersList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ userName, users }) => ({
    userName,
    users
  }),
  { addUser, deleteUser, addCategory, changeUserName }
)(UsersList);
