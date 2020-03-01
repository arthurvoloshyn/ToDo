import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonsGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      specialClass,
      children } = this.props;
    const classString = specialClass ? specialClass : '';

    return(
      <div
        className={`btn-group ${classString}`}
        role="group"
      >
        {React.Children.map(children, (child) => {
          return child;
        })}
      </div>
    );
  }
}

ButtonsGroup.propTypes = {
  activeElem: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]),
  specialClass: PropTypes.string
};

export default ButtonsGroup;
