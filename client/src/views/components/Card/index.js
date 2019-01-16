import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ className, children }) => <div className={`Card ${className}`}>{children}</div>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};
