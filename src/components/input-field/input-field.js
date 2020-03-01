import React from 'react';
import PropTypes from 'prop-types';
import Button from './../button/button';

const InputField = props => {

  const submitHandler = (evt, data) => {
    if (evt.keyCode === 13) {
      props.addFunction(data);
    }
  };

  const { value, changeFunction, data, addFunction, placeholder } = props;

  return (
    <div className="add-new">
      <div>
        <input
          value={value}
          onChange={(evt) => changeFunction(evt)}
          onKeyDown={(e) => submitHandler(e, data)}
          type="text"
          className="form-control"
          placeholder={placeholder}
        />
      </div>
      <Button
        onClickFunction={() => addFunction(data)}
        specialClass="btn-add"
      ><i className="material-icons">add</i></Button>
    </div>
  );
};

InputField.propTypes = {
  addFunction: PropTypes.func,
  changeFunction: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default InputField;
