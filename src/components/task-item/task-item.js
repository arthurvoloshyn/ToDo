import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Button from './../button/button';

const taskItem = props => {
  const { index, task, alias, doneTask, deleteTask } = props;
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
  }

  return (
    <div key={index} className={`${task.isTaskDone ? 'doneTask' : ''} ${itemClass}`} role="alert">
      <label className="tasks-list-item">
        <span onClick={() => doneTask(index, task)} className="tasks-list-mark">
          <i className="material-icons">{`${task.isTaskDone ? 'check_box' : 'check_box_outline_blank'}`}</i>
        </span>
        <h5 onClick={() => doneTask(index, task)} className="task-text">
          {task.text}
        </h5>
      </label>
      <div className="btn-group" role="group">
        <Link className="iconBtn" to={`/users/${alias}/tasks/${task.id}`}>
          <i className="material-icons">create</i>
        </Link>
        <Button onClickFunction={() => deleteTask(task)} specialClass="iconBtn">
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
  task: PropTypes.object
};

export default taskItem;
