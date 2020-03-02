function activeCategory(state = 'default', action) {
  let store = state;
  switch (action.type) {
    case 'CHANGE_ACTIVE_CATEGORY':
      store = action.alias;
      return store;
    default:
      return state;
  }
}

export default activeCategory;
