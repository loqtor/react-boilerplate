import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const Loader = (props) => {
  const { type, label, className } = props;
  const loaderClassName = classnames(className, {
    DotLoader: type === 'dot' || type === 'dots',
    Loader: type === 'circle',
    TextLoader: type === 'text',
  });

  return (
    <div className={loaderClassName} role="progressbar" aria-label={label} aria-busy="true">
      {type === 'circle' ? (
        <div className="Loader-inner" />
      ) : (
        [1, 2, 3].map(loaderDot => <div className={`${loaderClassName}-dot`} key={loaderDot} />)
      )}
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['circle', 'text', 'dots', 'dot']),
};

Loader.defaultProps = {
  className: '',
  label: '',
  type: 'circle',
};
