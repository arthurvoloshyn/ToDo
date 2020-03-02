import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task-item/task-item';

const RenderTask = ({ task, index, tasks, activeView, activeCategory, alias, doneTask, deleteTask, showDone }) => {
  const conditionWithShowingDone = (task.priority === activeView && task.category === activeCategory) || (activeView === 4 && task.category === activeCategory);
  const conditionWithoutShowingDone =
    (task.priority === activeView && !task.isTaskDone && task.category === activeCategory) || (activeView === 4 && !task.isTaskDone && task.category === activeCategory);
  const isDone = showDone ? conditionWithShowingDone : conditionWithoutShowingDone;

  return isDone ? <Task index={index} task={task} tasks={tasks} alias={alias} doneTask={doneTask} deleteTask={deleteTask} /> : null;
};

RenderTask.propTypes = {
  activeCategory: PropTypes.string,
  activeView: PropTypes.number,
  alias: PropTypes.string,
  deleteTask: PropTypes.func,
  doneTask: PropTypes.func,
  index: PropTypes.number,
  showDone: PropTypes.bool,
  task: PropTypes.shape({
    userId: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.string,
    text: PropTypes.string,
    priority: PropTypes.number,
    isTaskDone: PropTypes.bool
  }),
  tasks: PropTypes.arrayOf(
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

export default RenderTask;
