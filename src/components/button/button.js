import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClickFunction, specialClass, children, dataValue, checkActive }) => {
  const isActive = () => (checkActive === +dataValue ? 'active' : '');

  return (
    <button onClick={e => onClickFunction(e)} data-value={dataValue} type="button" className={`${specialClass} ${isActive()}`}>
      {React.Children.map(children, child => child)}
    </button>
  );
};

Button.propTypes = {
  checkActive: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]),
  dataValue: PropTypes.string,
  onClickFunction: PropTypes.func,
  specialClass: PropTypes.string
};

Button.defaultProps = {
  checkActive: null,
  dataValue: '',
  specialClass: '',
  children: null,
  onClickFunction: () => {}
};

export default Button;
