const initState = [];

const tasks = (state = initState, { type, userId, id, category, text, priority, isTaskDone }) => {
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
      return [...state].filter(task => task.id !== id);
    case 'UPDATE_TASK':
      return [...state].map(task =>
        task.id === id ? { ...task, category, isTaskDone, priority, text } : task
      );
    default:
      return state;
  }
};

export default tasks;
