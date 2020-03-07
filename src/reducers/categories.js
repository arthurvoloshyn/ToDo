const initState = [];

const categories = (state = initState, { type, userId, alias, id, text, category }) => {
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
      return [...state].filter(item => item.id !== id);
    case 'UPDATE_CATEGORY':
      return [...state].map(item => (item.id === category.id ? { ...item, text: category.text } : { ...item }));
    default:
      return state;
  }
};

export default categories;
