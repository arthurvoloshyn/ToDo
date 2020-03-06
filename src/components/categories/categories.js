import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import LocalApi from './../../helpers/localApi';
import Helpers from './../../helpers/Helpers';

import InputField from './../input-field/input-field';
import Button from './../button/button';
import ButtonsGroup from './../buttons-group/buttons-group';

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
    activeCategory: '',
    addCategory: () => {},
    alias: '',
    categories: [],
    categoryName: '',
    changeActiveCategory: () => {},
    changeCategoryName: () => {},
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
    const { categories } = this.props;

    if (categories.length > 0) {
      this.isActive(categories[0].alias);
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
    const { alias, addCategory, changeCategoryName } = this.props;

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

      this.api.addCategory(categoryInit);

      changeCategoryName('');
    }
  };

  deleteCategory = (evt, category) => {
    evt.stopPropagation();

    const { categories, tasks, deleteCategory, deleteTask } = this.props;
    const deletedCategory = this.Helpers.getDataById(categories, category.id);
    const { alias, userId } = deletedCategory;

    tasks.forEach(task => {
      if (task.category === alias && task.userId === userId) {
        deleteTask(task);

        this.api.deleteTask(task);
      }
    });

    toastr.confirm('This will delete all tasks connected with category', {
      onOk: () => {
        deleteCategory(deletedCategory);

        this.api.deleteCategory(deletedCategory);
      }
    });
  };

  editCategory = (evt, category) => {
    const { categories, updateCategory } = this.props;
    const edieableCategory = this.Helpers.getDataByAlias(categories, category.alias);

    edieableCategory.isEdit = !category.isEdit;
    updateCategory(edieableCategory);

    this.api.updateCategory(edieableCategory);
  };

  updateCategoryValue = ({ target: { value } }, category) => {
    const { categories, updateCategory } = this.props;
    const edieableCategory = this.Helpers.getDataByAlias(categories, category.alias);
    const newEdieableCategory = { ...edieableCategory, text: value };

    updateCategory(newEdieableCategory);

    this.api.updateCategory(newEdieableCategory);
  };

  render() {
    const { categories, categoryName, alias } = this.props;

    const category = categories.map((category, index) =>
      category.userId === alias ? (
        <article onClick={this.changeActive} key={index} data-name={category.alias} className={`category alert panel ${this.isActive(category.alias)}`} role="alert">
          <div className="category-name">
            <i className="material-icons">folder</i>
            {category.isEdit ? (
              <input value={category.text} onChange={evt => this.updateCategoryValue(evt, category)} onBlur={evt => this.editCategory(evt, category)} type="text" className="form-control" autoFocus />
            ) : (
              <h5 className="category-text">{category ? category.text : null}</h5>
            )}
          </div>
          <ButtonsGroup>
            {category.isEdit && (
              <Button onClickFunction={evt => this.editCategory(evt, category)} specialClass="iconBtn active">
                <i className="material-icons">done</i>
              </Button>
            )}
            {!category.isEdit && (
              <Button onClickFunction={evt => this.editCategory(evt, category)} specialClass="iconBtn">
                <i className="material-icons">create</i>
              </Button>
            )}
            <Button onClickFunction={evt => this.deleteCategory(evt, category)} specialClass="iconBtn">
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
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text-left">
              <h4 className="title">
                <i className="material-icons">next_week</i>
                <span>CATEGORIES:</span>
              </h4>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
              <InputField value={categoryName} changeFunction={this.updateInputValue} data={categoryName} addFunction={this.addCategory} placeholder="Click to add new category..." />
            </div>
          </div>
        </div>
        <div className="panel-body">{category}</div>
      </div>
    );
  }
}

export default Categories;
