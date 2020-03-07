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

export const deleteTask = task => ({
  type: 'DELETE_TASK',
  task
});

export const updateTask = task => ({
  type: 'UPDATE_TASK',
  task
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

export const updateCategory = category => ({
  type: 'UPDATE_CATEGORY',
  category
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
