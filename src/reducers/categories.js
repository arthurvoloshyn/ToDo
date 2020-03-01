function categories(state = [], action) {
  let store = [...state];
  let deleteIndex = 0;
  switch (action.type) {
    case 'ADD_CATEGORY' :
      return [
        ...state, {
        userId: action.userId,
        alias: action.alias,
        id: action.id,
        text: action.text
      }];
    case 'DELETE_CATEGORY' :
      store.forEach((category, index) => {
        if(category.id === action.category.id) {
          deleteIndex = index;
        }
      });
      store.splice(deleteIndex, 1);
      return store;
    case 'UPDATE_CATEGORY' :
      store = store.map(category => {
        if(category.id === action.category.id) {
          category.text = action.category.text;
        }
        return category;
      });
      return store;
    default:
      return state;
  }
}

export default categories;
