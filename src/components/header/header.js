import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import Button from './../button/button';
import Clock from './../clock/clock';
import logo from './../../img/react.svg'; // eslint-disable-line

const Header = props => {
  const alias = props.userAlias;
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users ? users.filter(item => item.alias === alias)[0] : {};
  const isTaskLocation = props.location.indexOf('tasks');

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            {user && (
              <div className="logout-btn-wrapper text-left">
                {isTaskLocation === -1 ? (
                  <Link to="/" type="button" className="btn btn-primary btn-log-out">
                    <i className="material-icons">exit_to_app</i>
                  </Link>
                ) : (
                  <Button onClickFunction={browserHistory.goBack} specialClass="btn-primary btn-back">
                    <i className="material-icons">keyboard_backspace</i>
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="col-lg-4 col-md-4">
            <Clock />
          </div>
          <div className="col-lg-4 col-md-4 text-right">
            {user && user.name ? <h4 className="greetings">Hello, {user.name}</h4> : <h4 className="greetings">Choose your profile</h4>}
            <div className="avatarWrapper">{user && user.name ? <img src={user.avatar} className="App-logo" alt={user.name} /> : <img src={logo} className="App-logo" alt="to-do logo" />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  location: PropTypes.string,
  userAlias: PropTypes.string
};

export default Header;
