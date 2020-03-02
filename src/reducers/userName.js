function userName(state = '', action) {
  let store = state;
  switch (action.type) {
    case 'CHANGE_USER_NAME':
      store = action.name;
      return store;
    default:
      return state;
  }
}

export default userName;
