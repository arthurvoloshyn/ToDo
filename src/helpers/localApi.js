import Helpers from './Helpers';

const Helper = new Helpers();

class LocalApi {
  getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

  getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

  getCategories = () => JSON.parse(localStorage.getItem('categories')) || [];

  getUserTasks = alias => {
    const userTasks = this.getTasks();

    return userTasks.filter(task => task.userId === alias) || [];
  };

  addUser = user => {
    const users = this.getUsers();
    users.push(user);

    Helper.addToLocalStorage(users, 'users');

    return { users };
  };

  addTask = tasks => {
    const userTasks = this.getTasks();
    userTasks.push(tasks);

    Helper.addToLocalStorage(userTasks, 'tasks');
  };

  addCategory = category => {
    const userCategories = this.getCategories();
    userCategories.push(category);

    Helper.addToLocalStorage(userCategories, 'categories');
  };

  updateUser = editUser => {
    const users = this.getUsers();

    const newUsers = users.map(user => {
      if (user.alias === editUser.alias) {
        user.settings[0].activeView = editUser.settings[0].activeView;
        user.settings[1].showDone = editUser.settings[1].showDone;
      }

      return user;
    });

    Helper.addToLocalStorage(newUsers, 'users');
  };

  updateTask = ({ id, category, isTaskDone, priority, text, userId }) => {
    const userTasks = this.getTasks();

    const newUserTasks = userTasks.map(task => (task.id === id ? { ...task, id, category, isTaskDone, priority, text, userId } : { ...task }));

    Helper.addToLocalStorage(newUserTasks, 'tasks');
  };

  updateCategory = ({ id, text, userId }) => {
    const userCategories = this.getCategories();

    const newUserCategories = userCategories.map(category => (category.id === id ? { ...category, id, text, userId } : { ...category }));

    Helper.addToLocalStorage(newUserCategories, 'categories');
  };

  deleteTask = ({ id }) => {
    const userTasks = this.getTasks();

    const newUserTasks = userTasks.filter(task => task.id !== id);

    Helper.addToLocalStorage(newUserTasks, 'tasks');
  };

  deleteCategory = ({ id }) => {
    const userCategories = this.getCategories();

    const newUserCategories = userCategories.filter(category => category.id !== id);

    Helper.addToLocalStorage(newUserCategories, 'categories');
  };

  deleteUser = index => {
    const users = this.getUsers();
    const alias = users.splice(index, 1)[0].alias;

    Helper.addToLocalStorage(users, 'users');

    return { alias, users };
  };

  deleteUserTask = alias => {
    const userTasks = this.getTasks();
    const tasks = userTasks.filter(({ userId }) => userId !== alias) || [];

    Helper.addToLocalStorage(tasks, 'tasks');
  };

  deleteUserCategories = alias => {
    const userCategories = this.getTasks();
    const categories = userCategories.filter(({ userId }) => userId !== alias) || [];

    Helper.addToLocalStorage(categories, 'categories');
  };
}

export default LocalApi;
