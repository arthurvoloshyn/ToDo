import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Button from './../button/button';

const taskItem = ({ index, task, alias, doneTask, deleteTask }) => {
  let itemClass = 'alert panel alert-';

  switch (task.priority) {
    case 1:
      itemClass = `${itemClass}danger`;
      break;
    case 2:
      itemClass = `${itemClass}warning`;
      break;
    case 3:
      itemClass = `${itemClass}success`;
      break;
    default:
      itemClass = `${itemClass}default`;
      break;
  }

  const onDoneTask = () => doneTask(index, task);
  const onDeleteTask = () => deleteTask(task);

  return (
    <div key={index} className={`${task.isTaskDone ? 'doneTask' : ''} ${itemClass}`} role="alert">
      <label className="tasks-list-item">
        <span onClick={onDoneTask} className="tasks-list-mark">
          <i className="material-icons">{`${task.isTaskDone ? 'check_box' : 'check_box_outline_blank'}`}</i>
        </span>
        <h5 onClick={onDoneTask} className="task-text">
          {task.text}
        </h5>
      </label>
      <div className="btn-group" role="group">
        <Link className="iconBtn" to={`/users/${alias}/tasks/${task.id}`}>
          <i className="material-icons">create</i>
        </Link>
        <Button onClickFunction={onDeleteTask} specialClass="iconBtn">
          <i className="material-icons">delete</i>
        </Button>
      </div>
    </div>
  );
};

taskItem.propTypes = {
  alias: PropTypes.string,
  deleteTask: PropTypes.func,
  doneTask: PropTypes.func,
  index: PropTypes.number,
  task: PropTypes.shape({
    userId: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.string,
    text: PropTypes.string,
    priority: PropTypes.number,
    isTaskDone: PropTypes.bool
  })
};

taskItem.defaultProps = {
  alias: '',
  deleteTask: () => {},
  doneTask: () => {},
  index: 0,
  task: {
    userId: '',
    id: new Date().getTime(),
    category: 'default',
    text: '',
    priority: 3,
    isTaskDone: false
  }
};

export default taskItem;
