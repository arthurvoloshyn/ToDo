import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import InputField from './../input-field/input-field';
import Button from './../button/button';
import ButtonsGroup from './../buttons-group/buttons-group';
import localApi from './../../helpers/localApi';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.api = new localApi();

    this.state = {
      isEdit: false
    };

    this.addCategory = this.addCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.updateCategoryValue = this.updateCategoryValue.bind(this);
  }

  componentWillMount() {
    if (this.props.categories.length > 0) {
      this.isActive(this.props.categories[0].alias);
    }
  }

  isActive(value) {
    return value === this.props.activeCategory ? 'active' : '';
  }

  changeActive(evt) {
    this.props.changeActiveCategory(evt.currentTarget.dataset['name']);
  }

  updateInputValue(evt) {
    this.props.changeCategoryName(evt.target.value);
  }

  addCategory(categoryName) {
    const categoryInit = {
      userId: this.props.alias,
      id: new Date().getTime(),
      text: categoryName,
      alias: categoryName.trim().replace(/ /gi, '')
    };
    if (categoryName.length < 2) {
      toastr.warning('Very short category name', { timeOut: 4000 });
    } else {
      this.props.addCategory(categoryInit.userId, categoryInit.id, categoryInit.text, categoryInit.alias);
      this.api.addCategory(categoryInit);
      this.props.changeCategoryName('');
    }
  }

  deleteCategory(evt, category) {
    evt.stopPropagation();
    let { categories, tasks, deleteCategory, deleteTask } = this.props;
    const deletedCategory = categories.filter(item => item.id === category.id)[0];

    tasks = tasks.map(task => {
      if (task.category === deletedCategory.alias && task.userId === deletedCategory.userId) {
        deleteTask(task);
        this.api.deleteTask(task);
      }
      return task;
    });

    toastr.confirm('This will delete all tasks connected with category', {
      onOk: () => {
        deleteCategory(deletedCategory);
        this.api.deleteCategory(deletedCategory);
      }
    });
  }

  editCategory(evt, category) {
    const { categories, updateCategory } = this.props;
    const edieableCategory = categories.filter(item => item.alias === category.alias)[0];
    edieableCategory.isEdit = !category.isEdit;
    updateCategory(edieableCategory);
    this.api.updateCategory(edieableCategory);
  }

  updateCategoryValue(evt, category) {
    const { categories, updateCategory } = this.props;
    const edieableCategory = categories.filter(item => item.alias === category.alias)[0];
    edieableCategory.text = evt.target.value;
    updateCategory(edieableCategory);
    this.api.updateCategory(edieableCategory);
  }

  render() {
    let { categories, categoryName } = this.props;

    let category = categories.map((category, index) => {
      if (category.userId === this.props.alias) {
        return (
          <div onClick={e => this.changeActive(e)} key={index} data-name={category.alias} className={`category alert panel ${this.isActive(category.alias)}`} role="alert">
            <div className="category-name">
              <i className="material-icons">folder</i>
              {category.isEdit ? (
                <input
                  value={category.text}
                  onChange={evt => this.updateCategoryValue(evt, category)}
                  onBlur={evt => this.editCategory(evt, category)}
                  type="text"
                  className="form-control"
                  autoFocus
                />
              ) : (
                <h5 className="category-text">{category ? category.text : null}</h5>
              )}
            </div>
            <ButtonsGroup>
              <Button onClickFunction={evt => this.editCategory(evt, category)} specialClass={`iconBtn ${category.isEdit ? 'active' : ''}`}>
                <i className="material-icons">{category.isEdit ? 'done' : 'create'}</i>
              </Button>
              <Button onClickFunction={evt => this.deleteCategory(evt, category)} specialClass="iconBtn">
                <i className="material-icons">delete</i>
              </Button>
            </ButtonsGroup>
          </div>
        );
      }
    });

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
              <InputField value={categoryName} changeFunction={this.updateInputValue} data={categoryName} addFunction={this.addCategory} placeholder={`Click to add new category...`} />
            </div>
          </div>
        </div>
        <div className="panel-body">{category}</div>
      </div>
    );
  }
}

Categories.propTypes = {
  activeCategory: PropTypes.string,
  addCategory: PropTypes.func,
  alias: PropTypes.string,
  categories: PropTypes.array,
  categoryName: PropTypes.string,
  changeActiveCategory: PropTypes.func,
  changeCategoryName: PropTypes.func,
  deleteCategory: PropTypes.func,
  deleteTask: PropTypes.func,
  tasks: PropTypes.array,
  updateCategory: PropTypes.func
};

export default Categories;
