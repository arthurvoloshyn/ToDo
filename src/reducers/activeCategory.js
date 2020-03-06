const initState = 'default';

const activeCategory = (state = initState, { type, alias }) => {
  switch (type) {
    case 'CHANGE_ACTIVE_CATEGORY':
      return alias;
    default:
      return state;
  }
};

export default activeCategory;
