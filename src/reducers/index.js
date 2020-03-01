import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import tasks from './tasks';
import users from './users';
import categories from './categories';
import activeCategory from './activeCategory';
import userName from './userName';
import taskText from './taskText';
import categoryName from './categoryName';

const rootReducer = combineReducers({ tasks, users, categories, activeCategory, userName, taskText, categoryName, toastr: toastrReducer });

export default rootReducer;
