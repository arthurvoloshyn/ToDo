const initState = '';

const userName = (state = initState, { type, name }) => {
  switch (type) {
    case 'CHANGE_USER_NAME':
      return name;
    default:
      return state;
  }
};

export default userName;
