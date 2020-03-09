// TODO: another way for pictures
import man1 from '../assets/img/avatars/man1.png'; // eslint-disable-line
import man2 from '../assets/img/avatars/man2.png'; // eslint-disable-line
import man3 from '../assets/img/avatars/man3.png'; // eslint-disable-line
import man4 from '../assets/img/avatars/man4.png'; // eslint-disable-line
import woman1 from '../assets/img/avatars/woman1.png'; // eslint-disable-line
import woman2 from '../assets/img/avatars/woman2.png'; // eslint-disable-line
import woman3 from '../assets/img/avatars/woman3.png'; // eslint-disable-line
import woman4 from '../assets/img/avatars/woman4.png'; // eslint-disable-line

class Helpers {
  getDataById = (dataArray, id) => dataArray.filter(data => data.id === +id)[0];

  getDataByAlias = (dataArray, alias) => dataArray.filter(data => data.alias === alias)[0];

  addToLocalStorage = (data, label) => localStorage.setItem(label, JSON.stringify(data));

  getProgress = (danger, warning, success) => {
    let koef = 100 / [danger.length, warning.length, success.length].reduce((sum, item) => sum + item, 0);

    koef = koef !== Infinity ? koef : 0; // fix for koef = Infinity

    return {
      danger: danger.length * koef,
      warning: warning.length * koef,
      success: success.length * koef
    };
  };

  getPriorityListWithValues = (list, danger, warning, success, all) =>
    list.map(item => {
      switch (item.title) {
        case 'Hight':
          return { ...item, value: danger };
        case 'Middle':
          return { ...item, value: warning };
        case 'Low':
          return { ...item, value: success };
        case 'All':
          return { ...item, value: all };
        default:
          return { ...item };
      }
    });

  getUsersAvatars = () => [man1, man2, man3, man4, woman1, woman2, woman3, woman4];
}

export default Helpers;
