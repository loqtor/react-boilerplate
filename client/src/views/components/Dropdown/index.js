import React, { Component } from 'react';
import classnames from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';

export class Dropdown extends Component {
  onChange = ({ value }) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {
      baseClassName, className, label, name, options, value, error,
    } = this.props;
    const selectedItem = options.find(item => item.value === `${value}`);
    const fieldClassName = classnames(baseClassName, className, { 'has-error': error });

    if (!value) {
      return null;
    }

    return (
      <div className={fieldClassName}>
        <Downshift
          onChange={this.onChange}
          selectedItem={value}
          itemToString={() => (options ? options.label : '')}
        >
          {({
            isOpen, getToggleButtonProps, getItemProps, getLabelProps, highlightedIndex,
          }) => (
            <div className={`${baseClassName}-wrap`}>
              <label htmlFor={name} className="u-hiddenVisually" {...getLabelProps()}>
                {label}
              </label>

              <div className={`${baseClassName}-trigger-wrap`}>
                <button
                  className={`${baseClassName}-trigger`}
                  type="button"
                  {...getToggleButtonProps()}
                >
                  {selectedItem !== '' ? selectedItem.label : label}
                </button>

                {error && (
                <div className={`${baseClassName}-icon`}>
                  <Icon name="declined" />
                </div>
                )}
              </div>

              <div className={`${baseClassName}-list`}>
                {isOpen && (
                <div id={name}>
                  {options.map((item, index) => {
                    const dropdownItemClass = classnames(`${baseClassName}-list-item`, {
                      'is-selected': selectedItem.value === item.value,
                      'is-focused': highlightedIndex === index,
                    });

                    return (
                      <div
                        className={dropdownItemClass}
                        key={item.label}
                        {...getItemProps({
                          key: index,
                          index,
                          item,
                          disabled: item.disabled,
                        })}
                      >
                        {item.label}
                      </div>
                    );
                  })}
                </div>
                )}
              </div>

              {error && (
              <div className={`${baseClassName}-error`}>
                <p>{error}</p>
              </div>
              )}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

Dropdown.propTypes = {
  baseClassName: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Dropdown.defaultProps = {
  baseClassName: 'Select',
  className: '',
  error: null,
  onChange: null,
};
