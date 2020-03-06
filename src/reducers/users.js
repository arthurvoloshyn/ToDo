const initState = [];

const users = (state = initState, { type, id, avatar, name, alias, settings, user }) => {
  switch (type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          id,
          avatar,
          name,
          alias,
          settings
        }
      ];
    case 'DELETE_USER':
      return [...state].filter(item => item.id !== id);
    case 'UPDATE_USER':
      return [...state].map(item => {
        if (item.alias === user.alias) {
          item.settings[0].activeView = user.settings[0].activeView;
          item.settings[1].showDone = user.settings[1].showDone;
        }
        return item;
      });
    default:
      return state;
  }
};

export default users;
