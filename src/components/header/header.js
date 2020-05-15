import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

import LocalApi from '~/helpers/localApi';
import Helpers from '~/helpers/Helpers';

import Button from '../button/button';
import Clock from '../clock/clock';

import logo from '~/assets/img/react.svg';

const Header = ({ userAlias, location }) => {
  const api = new LocalApi();
  const users = api.getUsers();

  const Helper = new Helpers();

  const user = users ? Helper.getDataByAlias(users, userAlias) : {};
  const isTaskLocation = location.includes('tasks');

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <nav className="col-lg-4 col-md-4">
            {user && (
              <div className="logout-btn-wrapper text-left">
                {!isTaskLocation ? (
                  <Link to="/" type="button" className="btn btn-primary btn-log-out">
                    <i className="material-icons">exit_to_app</i>
                  </Link>
                ) : (
                  <Button
                    onClickFunction={browserHistory.goBack}
                    specialClass="btn-primary btn-back"
                  >
                    <i className="material-icons">keyboard_backspace</i>
                  </Button>
                )}
              </div>
            )}
          </nav>
          <div className="col-lg-4 col-md-4">
            <Clock />
          </div>
          <div className="col-lg-4 col-md-4 text-right">
            {user && user.name ? (
              <h4 className="greetings">Hello, {user.name}</h4>
            ) : (
              <h4 className="greetings">Choose your profile</h4>
            )}
            <div className="avatarWrapper">
              {user && user.name ? (
                <img src={user.avatar} className="App-logo" alt={user.name} />
              ) : (
                <img src={logo} className="App-logo" alt="to-do logo" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.string,
  userAlias: PropTypes.string
};

Header.defaultProps = {
  location: '/',
  userAlias: ''
};

export default Header;
