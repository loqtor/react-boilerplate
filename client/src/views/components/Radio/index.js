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
      error,
      id,
      isChecked,
      isDisabled,
      isInGroup,
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
        {!isInGroup
          && error && (
            <div className="Radio-error u-pL-0">
              <p>{error}</p>
            </div>
        )}
      </Fragment>
    );
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isInGroup: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Radio.defaultProps = {
  error: null,
  className: 'Radio',
  value: null,
  name: '',
  isChecked: false,
  isDisabled: false,
  onChange: null,
  isInGroup: false,
  label: '',
  labelClassName: 'Radio-label',
  isReadOnly: false,
};
