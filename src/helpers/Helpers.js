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

  // Get Progress
  getProgress(danger, warning, success) {
    let koef = 100 / [danger.length, warning.length, success.length].reduce((sum, item) => (sum += item), 0);

    koef = koef !== Infinity ? koef : 0; // fix for koef = Infinity

    return {
      danger: danger.length * koef,
      warning: warning.length * koef,
      success: success.length * koef
    };
  }
}

export default Helpers;
