const initState = '';

const categoryName = (state = initState, { type, name }) => {
  switch (type) {
    case 'CHANGE_CATEGORY_NAME':
      return name;
    default:
      return state;
  }
};

export default categoryName;
