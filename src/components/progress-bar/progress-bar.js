import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowedCounters: false
    };

    this.updateProgress = this.updateProgress.bind(this);
    this.showCounters = this.showCounters.bind(this);
  }

  componentWillMount() {
    const { danger, warning, success } = this.updateProgress();
    this.setState({
      danger: danger,
      warning: warning,
      success: success
    });
  }

  componentWillReceiveProps(nextProps) {
    const { danger, warning, success } = this.updateProgress(nextProps);
    this.setState({
      danger: danger,
      warning: warning,
      success: success
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props !== nextProps;
  }

  showCounters() {
    this.setState({
      isShowedCounters: !this.state.isShowedCounters
    });
  }

  updateProgress(nextProps) {
    let { tasksList, alias, activeCategory} = this.props;
    let tasks = [], danger = [], warning = [], success = [];

    tasks = nextProps ? nextProps.tasksList : tasksList;
    activeCategory = nextProps ? nextProps.activeCategory : activeCategory;

    tasks = tasks.filter(task => task.userId === alias);

    for (let i = 0; i < tasks.length; i++) {
      if(!tasks[i].isTaskDone && tasks[i].category === activeCategory) {
        switch(tasks[i].priority) {
          case 1: danger.push(tasks[i]); break;
          case 2: warning.push(tasks[i]); break;
          case 3: success.push(tasks[i]); break;
        }
      }
    }

    let koef = 100/[danger.length, warning.length, success.length].reduce((sum, item) => sum += item, 0);

    koef = koef !== Infinity ? koef : 0; // fix for koef = Infinity

    return {
      danger: danger.length*koef,
      warning: warning.length*koef,
      success: success.length*koef
    };
  }

  render() {
    let { danger, warning, success, isShowedCounters } = this.state;

    return(
      <div
        onClick={this.showCounters}
        className="panel progress-panel"
      >
        {!isShowedCounters ?
          <div className="progress">
            <div
              className="progress-bar progress-bar-danger"
              role="progressbar"
              style={{width: danger +'%'}}
            ></div>
            <div
              className="progress-bar progress-bar-warning"
              role="progressbar"
              style={{width: warning +'%'}}
            ></div>
            <div
              className="progress-bar progress-bar-success"
              role="progressbar"
              style={{width: success +'%'}}
            ></div>
          </div> :
          <div className="progress progress-count">
            <div className="progress-counters">
              <div className="progress-counter progress-counter--danger">
                <span className="progress-descr">Hight</span>
                <span>{parseInt(danger || 0)+'%'}</span>
              </div>
            </div>
            <div className="progress-counters">
              <div className="progress-counter progress-counter--warning">
                <span className="progress-descr">Midle</span>
                <span>{parseInt(warning || 0)+'%'}</span>
              </div>
            </div>
            <div className="progress-counters">
              <div className="progress-counter progress-counter--success">
                <span className="progress-descr">Low</span>
                <span>{parseInt(success || 0)+'%'}</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

ProgressBar.propTypes = {
  activeCategory: PropTypes.string,
  alias: PropTypes.string,
  tasksList: PropTypes.array
};

export default ProgressBar;
