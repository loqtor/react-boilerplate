import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';

export const IconWithText = (props) => {
  const {
    classes, contentClass, iconRight, name, children,
  } = props;
  const classString = classNames('IconWithText', { 'IconWithText--right': iconRight }, classes);
  const contentClassString = classNames('IconWithText-content', contentClass);

  return (
    <div className={classString}>
      <div className="IconWithText-icon">
        <Icon name={name} />
      </div>

      <div className={contentClassString}>{children}</div>
    </div>
  );
};

IconWithText.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  contentClass: PropTypes.string.isRequired,
  iconRight: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
