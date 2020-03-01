import { createStore } from 'redux';
import localApi from './helpers/localApi';
import rootReducer from './reducers/index';

const api = new localApi();

const users = api.getUsers();
const tasks = api.getTasks();
const categories = api.getCategories();
const activeCategory = api.getCategories().length > 0 ?
api.getCategories()[0].alias : 'default';
const userName = '';
const taskText = '';
const categoryName = '';

const defaultState = {
  users,
  tasks,
  categories,
  activeCategory,
  userName,
  taskText,
  categoryName
};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
