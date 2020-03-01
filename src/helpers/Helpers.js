class Helpers {
  // Get particular task by ID
  getTask(tasksArray, id) {
    return tasksArray.filter(task => task.id === +id)[0];
  }

  // Get particular User by Alias
  getActiveUser(usersArray, alias) {
    return usersArray.filter(user => user.alias === alias)[0];
  }

  // Add data to local storage
  addToLocalStorage(data, label) {
    const sData = JSON.stringify(data);
    localStorage.setItem(label, sData);
  }
}

export default Helpers;
