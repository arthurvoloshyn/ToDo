import React from 'react';
import PropTypes from 'prop-types';

import { Enter } from '~/constants/constants';

import Button from '../button/button';

const InputField = ({ value, changeFunction, data, addFunction, placeholder, maxLength }) => {
  const submitHandler = ({ keyCode }) => {
    if (keyCode === Enter) {
      addFunction(data);
    }
  };

  const onAddFunction = () => addFunction(data);

  return (
    <div className="add-new">
      <div>
        <input value={value} onChange={changeFunction} onKeyDown={submitHandler} type="text" className="form-control" placeholder={placeholder} maxLength={`${maxLength}`} />
      </div>
      <Button onClickFunction={onAddFunction} specialClass="btn-add">
        <i className="material-icons">add</i>
      </Button>
    </div>
  );
};

InputField.propTypes = {
  addFunction: PropTypes.func,
  changeFunction: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

InputField.defaultProps = {
  addFunction: () => {},
  changeFunction: () => {},
  data: '',
  maxLength: 10,
  placeholder: '',
  value: ''
};

export default InputField;
