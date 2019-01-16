import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class Checkbox extends Component {
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
      isOptional,
      isReadOnly,
      isRTLLabel,
      isToggle,
      label,
      name,
      value,
    } = this.props;
    const baseClassName = classnames(className);
    const inputClassName = classnames({ 'has-error': error });
    const rtlClassName = classnames({ 'is-reversed': isRTLLabel });

    // setup the common props for all variations
    const setupProps = {
      checked: isChecked,
      disabled: isDisabled,
      id,
      name,
      onBlur: this.onBlur,
      onChange: this.onChange,
      readOnly: isReadOnly,
      type: 'checkbox',
      value,
    };

    if (isToggle) {
      return (
        <div className={`${baseClassName} ${inputClassName} ${rtlClassName}`}>
          <label htmlFor={id}>
            <input className="Toggle-input" {...setupProps} />
            <span className="Toggle-label">
              <span>{label}</span>
            </span>
          </label>
          {error && (
            <div className="Toggle-error u-pL-0">
              <p>{error}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`${baseClassName} ${inputClassName} ${rtlClassName}`}>
        <label htmlFor={name}>
          <input className="Checkbox-input" {...setupProps} />
          <span className="Checkbox-label">
            <span>
              {isOptional && <small className="u-textBold u-block">Optional</small>}
              {label}
              {error && (
                <div className="Checkbox-error">
                  <p>{error}</p>
                </div>
              )}
            </span>
          </span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOptional: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRTLLabel: PropTypes.bool,
  isToggle: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Checkbox.defaultProps = {
  className: '',
  error: '',
  id: null,
  isChecked: null,
  isDisabled: false,
  isOptional: false,
  isReadOnly: false,
  isRTLLabel: false,
  isToggle: false,
  label: '',
  onChange: null,
  value: undefined,
};
