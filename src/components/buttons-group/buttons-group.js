import React from 'react';
import PropTypes from 'prop-types';

const ButtonsGroup = ({ specialClass, children }) => {
  const classString = specialClass || '';

  return (
    <div className={`btn-group ${classString}`} role="group">
      {React.Children.map(children, child => child)}
    </div>
  );
};

ButtonsGroup.propTypes = {
  activeElem: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  specialClass: PropTypes.string
};

export default ButtonsGroup;
