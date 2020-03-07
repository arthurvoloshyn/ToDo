export const addUser = (id, avatar, name, alias, settings) => ({
  type: 'ADD_USER',
  id,
  avatar,
  name,
  alias,
  settings
});

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
});

export const deleteUser = id => ({
  type: 'DELETE_USER',
  id
});

export const addTask = (userId, id, category, text, priority, isTaskDone) => ({
  type: 'ADD_TASK',
  userId,
  id,
  category,
  text,
  priority,
  isTaskDone
});

export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id
});

export const updateTask = (id, category, isTaskDone, priority, text) => ({
  type: 'UPDATE_TASK',
  id,
  category,
  isTaskDone,
  priority,
  text
});

export const addCategory = (userId, id, text, alias) => ({
  type: 'ADD_CATEGORY',
  userId,
  id,
  text,
  alias
});

export const deleteCategory = id => ({
  type: 'DELETE_CATEGORY',
  id
});

export const updateCategory = (id, text) => ({
  type: 'UPDATE_CATEGORY',
  id,
  text
});

export const changeActiveCategory = alias => ({
  type: 'CHANGE_ACTIVE_CATEGORY',
  alias
});

export const changeUserName = name => ({
  type: 'CHANGE_USER_NAME',
  name
});

export const changeTaskText = text => ({
  type: 'CHANGE_TASK_TEXT',
  text
});

export const changeCategoryName = name => ({
  type: 'CHANGE_CATEGORY_NAME',
  name
});
