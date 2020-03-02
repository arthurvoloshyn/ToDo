function taskText(state = '', action) {
  let store = state;
  switch (action.type) {
    case 'CHANGE_TASK_TEXT':
      store = action.text;
      return store;
    default:
      return state;
  }
}

export default taskText;
