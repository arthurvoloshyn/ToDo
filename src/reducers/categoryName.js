function categoryName(state = '', action) {
  let store = state;
  switch (action.type) {
    case 'CHANGE_CATEGORY_NAME':
      store = action.name;
      return store;
    default:
      return state;
  }
}

export default categoryName;
