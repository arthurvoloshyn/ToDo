const initState = '';

const taskText = (state = initState, { type, text }) => {
  switch (type) {
    case 'CHANGE_TASK_TEXT':
      return text;
    default:
      return state;
  }
};

export default taskText;
