// add user
export function addUser(id, avatar, name, alias, settings) {
  return {
    type: 'ADD_USER',
    id,
    avatar,
    name,
    alias,
    settings
  };
}

// update user
export function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    user
  };
}

// delete user
export function deleteUser(userIndex) {
  return {
    type: 'DELETE_USER',
    userIndex
  };
}

// add task
export function addTask(userId, id, category, text, priority, isTaskDone) {
  return {
    type: 'ADD_TASK',
    userId,
    id,
    category,
    text,
    priority,
    isTaskDone
  };
}

// delete task
export function deleteTask(task) {
  return {
    type: 'DELETE_TASK',
    task
  };
}

// update task
export function updateTask(task) {
  return {
    type: 'UPDATE_TASK',
    task
  };
}

// add category
export function addCategory(userId, id, text, alias) {
  return {
    type: 'ADD_CATEGORY',
    userId,
    id,
    text,
    alias
  };
}

// delete category
export function deleteCategory(category) {
  return {
    type: 'DELETE_CATEGORY',
    category
  };
}

// update category
export function updateCategory(category) {
  return {
    type: 'UPDATE_CATEGORY',
    category
  };
}

// change active category
export function changeActiveCategory(alias) {
  return {
    type: 'CHANGE_ACTIVE_CATEGORY',
    alias
  };
}

// change user name
export function changeUserName(name) {
  return {
    type: 'CHANGE_USER_NAME',
    name
  };
}

// change task text
export function changeTaskText(text) {
  return {
    type: 'CHANGE_TASK_TEXT',
    text
  };
}

// change category name
export function changeCategoryName(name) {
  return {
    type: 'CHANGE_CATEGORY_NAME',
    name
  };
}
