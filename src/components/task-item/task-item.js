import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Button from './../button/button';

const taskItem = ({ index, id, text, isTaskDone, priority, alias, doneTask, deleteTask }) => {
  let itemClass = 'alert panel alert-';

  switch (priority) {
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

  const onDoneTask = () => doneTask(id);
  const onDeleteTask = () => deleteTask(id);

  return (
    <article key={index} className={`${isTaskDone ? 'doneTask' : ''} ${itemClass}`} role="alert">
      <label className="tasks-list-item">
        <span onClick={onDoneTask} className="tasks-list-mark">
          <i className="material-icons">{`${isTaskDone ? 'check_box' : 'check_box_outline_blank'}`}</i>
        </span>
        <h5 onClick={onDoneTask} className="task-text">
          {text}
        </h5>
      </label>
      <div className="btn-group" role="group">
        <Link className="iconBtn" to={`/users/${alias}/tasks/${id}`}>
          <i className="material-icons">create</i>
        </Link>
        <Button onClickFunction={onDeleteTask} specialClass="iconBtn">
          <i className="material-icons">delete</i>
        </Button>
      </div>
    </article>
  );
};

taskItem.propTypes = {
  alias: PropTypes.string,
  deleteTask: PropTypes.func,
  doneTask: PropTypes.func,
  id: PropTypes.number,
  index: PropTypes.number,
  isTaskDone: PropTypes.bool,
  priority: PropTypes.number,
  text: PropTypes.string
};

taskItem.defaultProps = {
  alias: '',
  deleteTask: () => {},
  doneTask: () => {},
  id: new Date().getTime(),
  index: 0,
  isTaskDone: false,
  priority: 3,
  text: ''
};

export default taskItem;
