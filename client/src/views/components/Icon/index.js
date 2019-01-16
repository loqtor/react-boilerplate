import React from 'react';
import PropTypes from 'prop-types';

import { ICONS } from '../../../redux/modules/app/constants';

export const toDarkIcon = iconName => iconName.replace(/light/, 'dark');
export const toLightIcon = iconName => iconName.replace(/dark/, 'light');

export const Icon = (props) => {
  const { SVGs, IcoMoonIcons } = ICONS;
  const { name, className } = props;
  const isSVG = SVGs[name];
  const icon = IcoMoonIcons[name] || SVGs[name];

  if (!icon) {
    // eslint-disable-next-line
    return console.warn(`No icon found for ${name}`);
  }

  if (isSVG) {
    const classes = className ? `SVG ${className}` : 'SVG';

    return (
      <span className={classes} data-icon={name}>
        {icon}
      </span>
    );
  }

  return icon;
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  className: null,
};
