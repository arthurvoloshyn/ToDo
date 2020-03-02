import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import localApi from './../../helpers/localApi';
import InputField from './../../components/input-field/input-field';
import { addUser, deleteUser, addCategory, changeUserName } from './../../actions/actionCreators';
// TODO: another way for pictures
import man1 from './../../img/avatars/man1.png'; // eslint-disable-line
import man2 from './../../img/avatars/man2.png'; // eslint-disable-line
import man3 from './../../img/avatars/man3.png'; // eslint-disable-line
import man4 from './../../img/avatars/man4.png'; // eslint-disable-line
import woman1 from './../../img/avatars/woman1.png'; // eslint-disable-line
import woman2 from './../../img/avatars/woman2.png'; // eslint-disable-line
import woman3 from './../../img/avatars/woman3.png'; // eslint-disable-line
import woman4 from './../../img/avatars/woman4.png'; // eslint-disable-line

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.api = new localApi();

    this.state = {
      users_avatars: [man1, man2, man3, man4, woman1, woman2, woman3, woman4],
      avatarIndex: 0
    };

    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUserValue = this.updateUserValue.bind(this);
    this.setTasksCounter = this.setTasksCounter.bind(this);
    this.changeUserAvatar = this.changeUserAvatar.bind(this);
  }

  updateUserValue(evt) {
    this.props.changeUserName(evt.target.value);
  }

  setTasksCounter(index) {
    const alias = this.props.users[index].alias;
    const tasksValue = this.api.getUserTasks(alias);
    return tasksValue === null ? 0 : tasksValue.length ? tasksValue.filter(task => task.isTaskDone === false).length : 0;
  }

  isActive(value) {
    return value === this.state.avatarIndex ? 'active' : '';
  }

  changeUserAvatar(e) {
    this.setState({ avatarIndex: +e.target.getAttribute('data-index') });
  }

  addUser() {
    const { userName, addUser, addCategory, changeUserName } = this.props;
    const userInit = {
      id: new Date().getTime(),
      avatar: this.state.users_avatars[this.state.avatarIndex],
      name: userName,
      alias: `user_${new Date().getTime()}`,
      settings: [{ activeView: 4 }, { showDone: true }]
    };
    if (userName.length <= 2) {
      toastr.warning('Very short name', { timeOut: 4000 });
    } else {
      const user = addUser(userInit.id, userInit.avatar, userInit.name, userInit.alias, userInit.settings);
      this.api.addUser(user);

      const categoryInit = {
        userId: userInit.alias,
        id: new Date().getTime(),
        text: 'default',
        alias: 'default'
      };
      addCategory(categoryInit.userId, categoryInit.id, categoryInit.text, categoryInit.alias);
      this.api.addCategory(categoryInit);
      changeUserName('');
      toastr.success('New user successfully added', { timeOut: 3000 });
    }
  }

  deleteUser(index) {
    toastr.confirm('Are you sure that you want to delete user profile', {
      onOk: () => {
        const { alias } = this.api.deleteUser(index);
        this.props.deleteUser(index);
        this.api.deleteUserTask(alias);
        this.api.deleteUserCategories(alias);
      }
    });
  }

  render() {
    const avatars = this.state.users_avatars.map((avatar, i) => {
      return (
        <div key={i} className={`avatar-wrapp ${this.isActive(i)}`}>
          <img onClick={e => this.changeUserAvatar(e)} data-index={i} className="avatar" src={avatar} alt="avatar" />
        </div>
      );
    });

    const users = this.props.users.map((user, i) => {
      return (
        <div key={i} className="panel users__item">
          <div className="panel-body">
            <span className="label label-info active-tasks">{this.setTasksCounter(i)}</span>
            <Link to={`/users/${user.alias}`} className="users__avatar">
              <img src={user.avatar} alt={user.name} />
            </Link>
            <Link to={`/users/${user.alias}`} className="users__name">
              {user.name}
            </Link>
            <span onClick={() => this.deleteUser(i)} className="label label-danger delete-user">
              Delete profile
            </span>
          </div>
        </div>
      );
    });

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
                    <InputField value={this.props.userName} changeFunction={this.updateUserValue} addFunction={this.addUser} placeholder={`click to add your full name...`} />
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <h5 className="user-descr">Choose your avatar:</h5>
                <div className="user-avatars-wrapper">{avatars}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="users__list">{users}</div>
          </div>
        </div>
      </div>
    );
  }
}

UsersList.propTypes = {
  addCategory: PropTypes.func,
  addUser: PropTypes.func,
  changeUserName: PropTypes.func,
  deleteUser: PropTypes.func,
  userName: PropTypes.string,
  users: PropTypes.array
};

export default connect(
  state => ({
    userName: state.userName,
    users: state.users
  }),
  { addUser, deleteUser, addCategory, changeUserName }
)(UsersList);
