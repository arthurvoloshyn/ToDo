import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helpers from '../../helpers/Helpers';

class ProgressBar extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    alias: PropTypes.string,
    tasksList: PropTypes.arrayOf(
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
    activeCategory: 'default',
    alias: '',
    tasksList: []
  };

  Helpers = new Helpers();

  state = {
    isShowedCounters: false
  };

  componentWillMount() {
    const { danger, warning, success } = this.updateProgress();

    this.setState({
      danger,
      warning,
      success
    });
  }

  componentWillReceiveProps(nextProps) {
    const { danger, warning, success } = this.updateProgress(nextProps);

    this.setState({
      danger,
      warning,
      success
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props !== nextProps;
  }

  showCounters = () => {
    this.setState(({ isShowedCounters }) => ({
      isShowedCounters: !isShowedCounters
    }));
  };

  updateProgress = nextProps => {
    let { tasksList, alias, activeCategory } = this.props;
    let tasks = nextProps ? nextProps.tasksList : tasksList;
    const danger = [];
    const warning = [];
    const success = [];

    activeCategory = nextProps ? nextProps.activeCategory : activeCategory;

    tasks = tasks.filter(({ userId }) => userId === alias);

    tasks.forEach(task => {
      if (!task.isTaskDone && task.category === activeCategory) {
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

    return this.Helpers.getProgress(danger, warning, success);
  };

  render() {
    const { danger, warning, success, isShowedCounters } = this.state;
    const progressList = this.Helpers.getPriorityListWithValues(danger, warning, success);

    return (
      <div onClick={this.showCounters} className="panel progress-panel">
        {!isShowedCounters ? (
          <div className="progress">
            {progressList.map(({ value, id }) => (
              <div key={id} className={`progress-bar progress-bar-${id}`} role="progressbar" style={{ width: `${value}%` }} />
            ))}
          </div>
        ) : (
          <div className="progress progress-count">
            {progressList.map(({ value, title, id }) => (
              <div key={id} className="progress-counters">
                <div className={`progress-counter progress-counter--${id}`}>
                  <span className="progress-desc">{title}</span>
                  <span>{`${parseInt(value) || 0}%`}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ProgressBar;
