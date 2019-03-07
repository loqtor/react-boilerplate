import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class Radio extends Component {
  onChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const {
      className,
      id,
      isChecked,
      isDisabled,
      isReadOnly,
      label,
      labelClassName,
      name,
      value,
    } = this.props;

    const inputClassName = classnames(className, { 'is-selected': isChecked });

    return (
      <Fragment>
        <label className={inputClassName} htmlFor={id}>
          <input
            className="Radio-input"
            disabled={isDisabled}
            id={id}
            onChange={this.onChange}
            readOnly={isReadOnly}
            type="radio"
            checked={isChecked}
            name={name}
            value={value}
          />
          <span className={labelClassName}>{label}</span>
        </label>
      </Fragment>
    );
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.shape({}),
  ]),
};

Radio.defaultProps = {
  className: 'Radio',
  value: null,
  isChecked: false,
  isDisabled: false,
  onChange: null,
  labelClassName: 'Radio-label',
  isReadOnly: false,
};
