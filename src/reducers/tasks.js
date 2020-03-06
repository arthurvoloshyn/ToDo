const initState = [];

const tasks = (state = initState, { type, userId, id, category, text, priority, isTaskDone, task }) => {
  switch (type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          userId,
          id,
          category,
          text,
          priority,
          isTaskDone
        }
      ];
    case 'DELETE_TASK':
      return [...state].filter(({ id }) => id !== task.id);
    case 'UPDATE_TASK':
      return [...state].map(item => (item.id === task.id ? { ...item, category: task.category, isTaskDone: task.isTaskDone, priority: task.priority, text: task.text } : { ...item }));
    default:
      return state;
  }
};

export default tasks;
