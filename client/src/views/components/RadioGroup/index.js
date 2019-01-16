import React from 'react';
import PropTypes from 'prop-types';

import Radio from '../Radio';

const RadioGroup = (props) => {
  const {
    className, error, options, wrapperClass, name,
  } = props;

  return (
    <fieldset className="RadioGroup">
      <div className={wrapperClass}>
        {options.map(option => (
          <div key={option.id} className={className}>
            <Radio
              id={option.id}
              className={option.className}
              isChecked={option.isChecked}
              name={name}
              onChange={option.onChange}
              value={option.value}
              label={option.label}
            />
          </div>
        ))}
        {error && (
          <div className="RadioGroup-error u-pL-0">
            <p>{error}</p>
          </div>
        )}
      </div>
    </fieldset>
  );
};

RadioGroup.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool,
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
  ).isRequired,
  wrapperClass: PropTypes.string,
};

RadioGroup.defaultProps = {
  className: 'Radio',
  error: '',
  wrapperClass: '',
};

export default RadioGroup;
