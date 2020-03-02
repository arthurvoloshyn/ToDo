function tasks(state = [], action) {
  let store = [...state];
  let deleteIndex = 0;
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          userId: action.userId,
          id: action.id,
          category: action.category,
          text: action.text,
          priority: action.priority,
          isTaskDone: action.isTaskDone
        }
      ];
    case 'DELETE_TASK':
      store.forEach((task, index) => {
        if (task.id === action.task.id) {
          deleteIndex = index;
        }
      });
      store.splice(deleteIndex, 1);
      return store;
    case 'UPDATE_TASK':
      store = store.map(task => {
        if (task.id === action.task.id) {
          task.category = action.task.category;
          task.isTaskDone = action.task.isTaskDone;
          task.priority = action.task.priority;
          task.text = action.task.text;
        }
        return task;
      });
      return store;
    default:
      return state;
  }
}

export default tasks;
