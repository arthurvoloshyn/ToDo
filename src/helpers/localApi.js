import Helpers from './Helpers';

const Helper = new Helpers();

class localApi {
  getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
  }

  getUserTasks(alias) {
    let userTasks = this.getTasks();
    return userTasks.filter(task => task.userId === alias) || [];
  }

  addUser(user) {
    let users = this.getUsers();
    users.push(user);
    Helper.addToLocalStorage(users, 'users');
    return { users };
  }

  addTask(tasks) {
    let userTasks = this.getTasks();
    userTasks.push(tasks);
    Helper.addToLocalStorage(userTasks, 'tasks');
  }

  addCategory(category) {
    let userCategories = this.getCategories();
    userCategories.push(category);
    Helper.addToLocalStorage(userCategories, 'categories');
  }

  updateUser(editUser) {
    let users = this.getUsers();
    users = users.map(user => {
      if(user.alias === editUser.alias) {
        user.settings[0].activeView = editUser.settings[0].activeView;
        user.settings[1].showDone = editUser.settings[1].showDone;
      }
      return user;
    });
    Helper.addToLocalStorage(users, 'users');
  }

  updateTask(doneTask) {
    let userTasks = this.getTasks();
    userTasks = userTasks.map(task => {
      if(task.id === doneTask.id) {
        task.id = doneTask.id;
        task.category = doneTask.category;
        task.isTaskDone = doneTask.isTaskDone;
        task.priority = doneTask.priority;
        task.text = doneTask.text;
        task.userId = doneTask.userId;
      }
      return task;
    });
    Helper.addToLocalStorage(userTasks, 'tasks');
  }

  updateCategory(editCategory) {
    let userCategories = this.getCategories();
    userCategories = userCategories.map(category => {
      if(category.id === editCategory.id) {
        category.id = editCategory.id;
        category.text = editCategory.text;
        category.userId = editCategory.userId;
      }
      return category;
    });
    Helper.addToLocalStorage(userCategories, 'categories');
  }

  deleteTask(deletedTask) {
    let userTasks = this.getTasks();
    let deleteIndex = 0;
    userTasks.forEach((task, index) => {
      if(task.id === deletedTask.id) {
        deleteIndex = index;
      }
    });
    userTasks.splice(deleteIndex, 1);
    Helper.addToLocalStorage(userTasks, 'tasks');
  }

  deleteCategory(deletedCategory) {
    let userCategories = this.getCategories();
    let deleteIndex = 0;
    userCategories.forEach((category, index) => {
      if(category.id === deletedCategory.id) {
        deleteIndex = index;
      }
    });
    userCategories.splice(deleteIndex, 1);
    Helper.addToLocalStorage(userCategories, 'categories');
  }

  deleteUser(index) {
    let users = this.getUsers();
    const alias = users.splice(index, 1)[0].alias;
    Helper.addToLocalStorage(users, 'users');
    return { alias, users };
  }

  deleteUserTask(alias) {
    let userTasks = this.getTasks();
    let tasks = userTasks.filter(task => task.userId !== alias) || [];
    Helper.addToLocalStorage(tasks, 'tasks');
  }

  deleteUserCategories(alias) {
    let userCategories = this.getTasks();
    let categories = userCategories.filter(category => category.userId !== alias) || [];
    Helper.addToLocalStorage(categories, 'categories');
  }
}

export default localApi;
