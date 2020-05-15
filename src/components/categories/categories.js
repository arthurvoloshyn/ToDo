import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import LocalApi from '~/helpers/localApi';
import Helpers from '~/helpers/Helpers';

import InputField from '../input-field/input-field';
import Button from '../button/button';
import ButtonsGroup from '../buttons-group/buttons-group';

class Categories extends Component {
  static propTypes = {
    activeCategory: PropTypes.string,
    addCategory: PropTypes.func,
    alias: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        text: PropTypes.string,
        alias: PropTypes.string
      })
    ),
    categoryName: PropTypes.string,
    changeActiveCategory: PropTypes.func,
    changeCategoryName: PropTypes.func,
    currentCategories: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        text: PropTypes.string,
        alias: PropTypes.string
      })
    ),
    deleteCategory: PropTypes.func,
    deleteTask: PropTypes.func,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        id: PropTypes.number,
        category: PropTypes.string,
        text: PropTypes.string,
        priority: PropTypes.number,
        isTaskDone: PropTypes.bool
      })
    ),
    updateCategory: PropTypes.func
  };

  static defaultProps = {
    activeCategory: 'default',
    addCategory: () => {},
    alias: '',
    categories: [],
    categoryName: '',
    changeActiveCategory: () => {},
    changeCategoryName: () => {},
    currentCategories: [],
    deleteCategory: () => {},
    deleteTask: () => {},
    tasks: [],
    updateCategory: () => {}
  };

  state = {
    isEdit: false
  };

  api = new LocalApi();
  Helpers = new Helpers();

  componentWillMount() {
    const { changeActiveCategory, currentCategories } = this.props;

    if (currentCategories.length > 0) {
      changeActiveCategory(currentCategories[0].alias);
    }
  }

  isActive = value => {
    const { activeCategory } = this.props;

    return value === activeCategory ? 'active' : '';
  };

  changeActive = ({
    currentTarget: {
      dataset: { name }
    }
  }) => {
    const { changeActiveCategory } = this.props;

    changeActiveCategory(name);
  };

  updateInputValue = ({ target: { value } }) => {
    const { changeCategoryName } = this.props;

    changeCategoryName(value);
  };

  addCategory = categoryName => {
    const { alias, addCategory, changeCategoryName, changeActiveCategory } = this.props;
    const { addCategory: addCategoryApi } = this.api;

    const categoryInit = {
      userId: alias,
      id: new Date().getTime(),
      text: categoryName,
      alias: categoryName.trim().replace(/ /gi, '')
    };

    if (categoryName.length < 2) {
      toastr.warning('Very short category name', { timeOut: 4000 });
    } else {
      const { userId, id, text, alias } = categoryInit;

      addCategory(userId, id, text, alias);

      addCategoryApi(categoryInit);

      changeCategoryName('');
      changeActiveCategory(alias);
    }
  };

  deleteCategory = (evt, id) => {
    evt.stopPropagation();

    const {
      categories,
      tasks,
      deleteCategory,
      deleteTask,
      changeActiveCategory,
      currentCategories
    } = this.props;
    const { getDataById } = this.Helpers;
    const { deleteTask: deleteTaskApi, deleteCategory: deleteCategoryApi } = this.api;

    const updatedCurrentCategories = currentCategories.filter(category => category.id !== id);
    const deletedCategory = getDataById(categories, id);

    toastr.confirm('This will delete all tasks connected with category', {
      onOk: () => {
        tasks.forEach(({ category, userId, id }) => {
          if (category === deletedCategory.alias && userId === deletedCategory.userId) {
            deleteTask(id);

            deleteTaskApi(id);
          }
        });

        deleteCategory(deletedCategory.id);

        deleteCategoryApi(deletedCategory.id);

        if (updatedCurrentCategories.length > 0) {
          changeActiveCategory(updatedCurrentCategories[0].alias);
        }
      }
    });
  };

  editCategory = (alias, isEdit) => {
    const { categories, updateCategory } = this.props;
    const { getDataByAlias } = this.Helpers;
    const { updateCategory: updateCategoryApi } = this.api;

    const editableCategory = getDataByAlias(categories, alias);
    const { id, text, userId } = editableCategory;

    editableCategory.isEdit = !isEdit;
    updateCategory(id, text);

    updateCategoryApi(id, text, userId);
  };

  updateCategoryValue = ({ target: { value } }, alias) => {
    const { categories, updateCategory } = this.props;
    const { getDataByAlias } = this.Helpers;
    const { updateCategory: updateCategoryApi } = this.api;

    const editableCategory = getDataByAlias(categories, alias);
    const { id, userId } = editableCategory;

    updateCategory(id, value);

    updateCategoryApi(id, value, userId);
  };

  render() {
    const {
      categories: propsCategories,
      categoryName: propsCategoryName,
      alias: propsAlias
    } = this.props;

    const category = propsCategories.map(({ userId, alias, isEdit, text, id }, index) =>
      userId === propsAlias ? (
        <article
          onClick={this.changeActive}
          key={index}
          data-name={alias}
          className={`category alert panel ${this.isActive(alias)}`}
        >
          <div className="category-name">
            <i className="material-icons">folder</i>
            {isEdit ? (
              <input
                value={text}
                onChange={evt => this.updateCategoryValue(evt, alias)}
                onBlur={() => this.editCategory(alias, isEdit)}
                type="text"
                className="form-control category-text"
                autoFocus
              />
            ) : (
              <h5 className="category-text">{text || null}</h5>
            )}
          </div>
          <ButtonsGroup>
            {isEdit && (
              <Button
                onClickFunction={() => this.editCategory(alias, isEdit)}
                specialClass="iconBtn active"
              >
                <i className="material-icons">done</i>
              </Button>
            )}
            {!isEdit && (
              <Button
                onClickFunction={() => this.editCategory(alias, isEdit)}
                specialClass="iconBtn"
              >
                <i className="material-icons">create</i>
              </Button>
            )}
            <Button onClickFunction={evt => this.deleteCategory(evt, id)} specialClass="iconBtn">
              <i className="material-icons">delete</i>
            </Button>
          </ButtonsGroup>
        </article>
      ) : null
    );

    return (
      <div className="panel panel-default categories">
        <div className="panel-heading categories-heading">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text-left text-block">
              <h4 className="title">
                <i className="material-icons">next_week</i>
                <span>CATEGORIES:</span>
              </h4>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right text-block">
              <InputField
                value={propsCategoryName}
                changeFunction={this.updateInputValue}
                data={propsCategoryName}
                addFunction={this.addCategory}
                placeholder="Click to add new category..."
              />
            </div>
          </div>
        </div>
        <div className="panel-body">{category}</div>
      </div>
    );
  }
}

export default Categories;
