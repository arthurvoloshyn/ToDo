function users(state = [], action) {
  const i = action.userIndex;
  let store = [...state];
  switch (action.type) {
    case 'ADD_USER' :
      return [
        ...state, {
        id: action.id,
        avatar: action.avatar,
        name: action.name,
        alias: action.alias,
        settings: action.settings
      }];
    case 'DELETE_USER' :
      store.splice(i, 1);
      return store;
    case 'UPDATE_USER' :
    store = store.map(user => {
      if(user.alias === action.user.alias) {
        user.settings[0].activeView = action.user.settings[0].activeView;
        user.settings[1].showDone = action.user.settings[1].showDone;
      }
      return user;
    });
    return store;
    default:
      return state;
  }
}

export default users;
