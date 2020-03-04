import { priorityList } from '../constants/constants';

// TODO: another way for pictures
import man1 from './../img/avatars/man1.png'; // eslint-disable-line
import man2 from './../img/avatars/man2.png'; // eslint-disable-line
import man3 from './../img/avatars/man3.png'; // eslint-disable-line
import man4 from './../img/avatars/man4.png'; // eslint-disable-line
import woman1 from './../img/avatars/woman1.png'; // eslint-disable-line
import woman2 from './../img/avatars/woman2.png'; // eslint-disable-line
import woman3 from './../img/avatars/woman3.png'; // eslint-disable-line
import woman4 from './../img/avatars/woman4.png'; // eslint-disable-line

class Helpers {
  getDataById(dataArray, id) {
    return dataArray.filter(data => data.id === +id)[0];
  }

  getDataByAlias(dataArray, alias) {
    return dataArray.filter(data => data.alias === alias)[0];
  }

  addToLocalStorage(data, label) {
    const sData = JSON.stringify(data);
    localStorage.setItem(label, sData);
  }

  getProgress(danger, warning, success) {
    let koef = 100 / [danger.length, warning.length, success.length].reduce((sum, item) => (sum += item), 0);

    koef = koef !== Infinity ? koef : 0; // fix for koef = Infinity

    return {
      danger: danger.length * koef,
      warning: warning.length * koef,
      success: success.length * koef
    };
  }

  getPriorityListWithValues(danger, warning, success) {
    return priorityList.map(item => {
      switch (item.title) {
        case 'Hight':
          return { ...item, value: danger };
        case 'Midle':
          return { ...item, value: warning };
        case 'Low':
          return { ...item, value: success };
        default:
          return { ...item };
      }
    });
  }

  getUsersAvatars() {
    return [man1, man2, man3, man4, woman1, woman2, woman3, woman4];
  }
}

export default Helpers;
