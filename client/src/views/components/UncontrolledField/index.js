import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view';
import { FormattedMessage } from 'react-intl';

import { Icon } from '../Icon';

export class UncontrolledField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      maskField: true,
    };
  }

  componentDidMount() {
    const { shouldAutoFocus } = this.props;

    if (shouldAutoFocus) {
      this.inputElement.focus();
    }
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      maskField: !prevState.maskField,
    }));
  };

  onClick = (event) => {
    const { onClick } = this.props;

    if (onClick) {
      this.onClick(event);
    }

    this.setState({
      isFocused: true,
    });
  };

  onFocus = (event) => {
    const { onFocus } = this.props;
    const isAndroid = /(android)/i.test(navigator.userAgent);

    if (onFocus) {
      onFocus(event);
    }

    if (isAndroid) {
      scrollIntoView(event.target);
    }

    this.setState({
      isFocused: true,
    });
  };

  onClear = (event) => {
    const { onClear } = this.props;

    this.inputElement.value = '';

    if (onClear) {
      onClear(event);
    }

    this.inputElement.focus();
  };

  onBlur = (event) => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(event);
    }

    this.setState({
      isFocused: false,
    });
  };

  onChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const {
      allowShowHide,
      autoComplete,
      className,
      error,
      id,
      inputMode,
      isClearable,
      isDisabled,
      isLabelHidden,
      label,
      maxLength,
      minLength,
      pattern,
      placeholder,
      isReadOnly,
      type,
      value,
    } = this.props;
    const { isFocused, maskField } = this.state;
    const hasLabel = label && !isLabelHidden;
    const isFloating = hasLabel && (isFocused || value !== '');
    const showToggle = value !== '' && allowShowHide;
    const showClearIcon = value !== '' && isClearable;
    // const hasValue = value !== '' && value !== null;
    const labelClassName = classnames('Input-label', { 'u-hiddenVisually': isLabelHidden });
    const errorClassName = type === 'textarea' ? 'TextArea-error' : 'Input-error';

    const fieldClassName = classnames(
      className,
      { 'has-clear': showClearIcon },
      { 'is-floating': isFloating },
      { 'is-readonly': isDisabled },
      { 'has-error': error },
      { 'has-toggle': showToggle },
      { 'is-prepopulated': placeholder },
      { 'has-label': hasLabel },
    );

    const setupProps = {
      autoComplete,
      disabled: isDisabled,
      id,
      maxLength,
      minLength,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      pattern,
      placeholder,
      readOnly: isReadOnly,
      ref: (el) => {
        this.inputElement = el;
      },
      type: maskField ? type : 'text',
      inputMode,
      value,
    };

    return (
      <div className={fieldClassName}>
        <label htmlFor={id}>
          <span className={labelClassName}>{label}</span>
          {type === 'textarea' ? <textarea {...setupProps} /> : <input {...setupProps} />}

          {showToggle && (
            // eslint-disable-next-line
            <div className="Input-toggle" onClick={() => this.togglePasswordMask()}>
              <Icon name={maskField ? 'password-hidden' : 'password-visible'} />
              <span className="u-hiddenVisually">
                {maskField ? 'Show Password' : 'Hide Password'}
              </span>
            </div>
          )}

          {error && <div className="Input-icon">{<Icon name="declined" />}</div>}

          {showClearIcon && (
            <div className="Input-clear">
              <button type="button" className={'Button \'has-icon\''} onClick={this.onClear}>
                <Icon name="clear" className="icon clear" />

                <span className="u-hiddenVisually">
                  <FormattedMessage id="CLEAR_INPUT" />
                </span>
              </button>
            </div>
          )}
        </label>

        {error && (
          <div className={errorClassName}>
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
}

UncontrolledField.propTypes = {
  allowShowHide: PropTypes.bool,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  inputMode: PropTypes.string,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLabelHidden: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  shouldAutoFocus: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

UncontrolledField.defaultProps = {
  allowShowHide: false,
  autoComplete: 'off',
  className: 'Input',
  error: null,
  id: null,
  inputMode: '',
  isClearable: false,
  isDisabled: false,
  isLabelHidden: false,
  isReadOnly: false,
  label: '',
  maxLength: '',
  minLength: '',
  onBlur: null,
  onChange: null,
  onClear: null,
  onClick: null,
  onFocus: null,
  pattern: null,
  placeholder: '',
  shouldAutoFocus: false,
  type: 'text',
  value: null,
};
