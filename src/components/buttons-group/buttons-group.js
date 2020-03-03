import React from 'react';
import PropTypes from 'prop-types';

const ButtonsGroup = ({ specialClass, children }) => (
  <div className={`btn-group ${specialClass}`} role="group">
    {React.Children.map(children, child => child)}
  </div>
);

ButtonsGroup.propTypes = {
  activeElem: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  specialClass: PropTypes.string
};

ButtonsGroup.defaultProps = {
  activeElem: null,
  children: null,
  specialClass: ''
};

export default ButtonsGroup;
