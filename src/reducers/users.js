const initState = [];

const users = (state = initState, { type, id, avatar, name, alias, settings, activeView, showDone }) => {
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
      return [...state].filter(user => user.id !== id);
    case 'UPDATE_USER':
      return [...state].map(user => (user.alias === alias ? { ...user, settings: [{ activeView }, { showDone }] } : user));
    default:
      return state;
  }
};

export default users;
