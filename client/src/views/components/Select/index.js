import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class Select extends Component {
  state = {
    isFocused: false,
  };

  onChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  };

  onBlur = (event) => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(event.target.value);
    }

    this.setState({ isFocused: false });
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  render() {
    const {
      baseClassName,
      className,
      error,
      hasOuterLabel,
      IconElement,
      initialSelected,
      isDisabled,
      isLabelHidden,
      label,
      options,
      placeholder,
      value,
    } = this.props;
    const { isFocused } = this.state;
    const isFloating = !hasOuterLabel && (isFocused || value !== '');

    const fieldClassName = classnames(
      baseClassName,
      className,
      { 'has-error': error },
      { 'has-placeholder': placeholder },
      { 'has-value': value !== '' },
      { 'is-floating': isFloating },
      { 'is-readonly': isDisabled },
    );

    const labelClassName = classnames(`${baseClassName}-label`, {
      'u-hiddenVisually': isLabelHidden,
    });

    return (
      <div className={fieldClassName}>
        <div className={`${baseClassName}-wrap`}>
          <span className={labelClassName}>{label}</span>

          {error && (
            <div className={`${baseClassName}-icon`}>
              {IconElement && <IconElement name="declined" />}
            </div>
          )}

          <select
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            placeholder={placeholder}
            value={value}
          >
            {placeholder
              && !initialSelected && (
                <option value="" disabled>
                  {placeholder}
                </option>
            )}

            {initialSelected
              && !placeholder && (
                <option value={initialSelected.value}>{initialSelected.label}</option>
            )}

            {options.map(option => (
              <option disabled={option.disabled} key={`${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
            {
              // @HACK to stop iOS truncating option text
            }
            <optgroup className="u-hidden" label="" />
          </select>
        </div>

        {error && (
          <div className="Select-error">
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
}

Select.propTypes = {
  baseClassName: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  hasOuterLabel: PropTypes.bool,
  IconElement: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  initialSelected: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  isLabelHidden: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Select.defaultProps = {
  baseClassName: 'Select',
  className: '',
  error: null,
  hasOuterLabel: false,
  IconElement: null,
  initialSelected: null,
  isDisabled: false,
  isLabelHidden: false,
  label: '',
  onBlur: null,
  onChange: null,
  placeholder: '',
  value: '',
};
