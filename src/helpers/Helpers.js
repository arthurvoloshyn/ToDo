// TODO: another way for pictures
import man1 from '~/assets/img/avatars/man1.png';
import man2 from '~/assets/img/avatars/man2.png';
import man3 from '~/assets/img/avatars/man3.png';
import man4 from '~/assets/img/avatars/man4.png';
import woman1 from '~/assets/img/avatars/woman1.png';
import woman2 from '~/assets/img/avatars/woman2.png';
import woman3 from '~/assets/img/avatars/woman3.png';
import woman4 from '~/assets/img/avatars/woman4.png';

class Helpers {
  getDataById = (dataArray, id) => dataArray.filter(data => data.id === +id)[0];

  getDataByAlias = (dataArray, alias) => dataArray.filter(data => data.alias === alias)[0];

  addToLocalStorage = (data, label) => localStorage.setItem(label, JSON.stringify(data));

  getProgress = (danger, warning, success) => {
    let koef =
      100 / [danger.length, warning.length, success.length].reduce((sum, item) => sum + item, 0);

    koef = koef !== Infinity ? koef : 0; // fix for koef = Infinity

    return {
      danger: danger.length * koef,
      warning: warning.length * koef,
      success: success.length * koef
    };
  };

  isEmptyArray = arr => arr.every(el => !el);

  getPriorityListWithValues = (list, ...data) => {
    if (this.isEmptyArray(data)) return list;

    const [danger, warning, success, all] = data;

    return list.map(item => {
      switch (item.title) {
        case 'High':
          return { ...item, value: danger };
        case 'Middle':
          return { ...item, value: warning };
        case 'Low':
          return { ...item, value: success };
        case 'All':
          return { ...item, value: all };
        default:
          return item;
      }
    });
  };

  getUsersAvatars = () => [man1, man2, man3, man4, woman1, woman2, woman3, woman4];
}

export default Helpers;
