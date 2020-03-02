import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  isActive() {
    return this.props.checkActive === +this.props.dataValue ? 'active' : '';
  }

  render() {
    let { onClickFunction, specialClass, children, dataValue } = this.props;

    const classString = specialClass ? specialClass : '';

    return (
      <button onClick={e => onClickFunction(e)} data-value={dataValue} type="button" className={`${classString} ${this.isActive()}`}>
        {React.Children.map(children, child => {
          return child;
        })}
      </button>
    );
  }
}

Button.propTypes = {
  checkActive: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.string]),
  dataValue: PropTypes.string,
  onClickFunction: PropTypes.func,
  specialClass: PropTypes.string
};

export default Button;
