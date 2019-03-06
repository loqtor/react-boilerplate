import React from 'react';
import PropTypes from 'prop-types';

import { Radio } from '../Radio';

/**

  <RadioGroup
    checkedId={this.state.activeRadioOption}
    onChange={this.handleRadioChange}
    name='MyRadioExample'
    options={[
      {
        id: 'option-one'
        label: 'Option One'
        value: true
      },
      {
        id: 'option-two'
        label: 'Option Two'
        value: false
      }
    ]}
  />

 */
export class RadioGroup extends React.Component {
  componentDidMount() {
    const { onChange, defaultTo, options } = this.props;
    if (!onChange) {
      console.error('Please supply an onChange event you monster');
      return;
    }

    let initialValue = defaultTo;
    if (initialValue === undefined) {
      const { value } = options[0];
      initialValue = value;
    }

    onChange(initialValue);
  }

  handleRadioChange = (e) => {
    const { onChange, options } = this.props;

    if (!onChange) {
      console.error('Please supply an onChange event you monster');
      return;
    }

    const {
      target: {
        id,
        value: fallBackValue,
      },
    } = e;

    let value = fallBackValue;

    const radioOption = options.find(o => o.id === id);
    if (radioOption !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      value = radioOption.value;
    }

    onChange(value);
  }

  render() {
    const {
      className,
      options,
      error,
      name,
      checkedValue,
    } = this.props;

    return (
      <fieldset className={className}>
        {options.map((option) => {
          const { value } = option;
          const isChecked = value === checkedValue;

          return (
            <Radio
              id={option.id}
              className={option.className}
              isChecked={isChecked}
              name={name}
              onChange={this.handleRadioChange}
              value={value}
              label={option.label}
              key={`radio-${value}`}
            />
          );
        })}
        {error && (
          <div className="RadioGroup-error u-pL-0">
            <p>{error}</p>
          </div>
        )}
      </fieldset>
    );
  }
}

RadioGroup.propTypes = {
  checkedValue: PropTypes.string.isRequired,
  className: PropTypes.string,
  defaultTo: PropTypes.shape({}),
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      id: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

RadioGroup.defaultProps = {
  className: 'RadioGroup',
  error: '',
  defaultTo: undefined,
};
