const initState = [];

const categories = (state = initState, { type, userId, alias, id, text }) => {
  switch (type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          userId,
          alias,
          id,
          text
        }
      ];
    case 'DELETE_CATEGORY':
      return [...state].filter(category => category.id !== id);
    case 'UPDATE_CATEGORY':
      return [...state].map(category => (category.id === id ? { ...category, text } : { ...category }));
    default:
      return state;
  }
};

export default categories;
