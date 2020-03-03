class Helpers {
  // Get particular data by ID
  getDataById(dataArray, id) {
    return dataArray.filter(data => data.id === +id)[0];
  }

  // Get particular data by Alias
  getDataByAlias(dataArray, alias) {
    return dataArray.filter(data => data.alias === alias)[0];
  }

  // Add data to local storage
  addToLocalStorage(data, label) {
    const sData = JSON.stringify(data);
    localStorage.setItem(label, sData);
  }
}

export default Helpers;
