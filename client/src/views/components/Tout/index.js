import React, { Component } from 'react';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';

import { Button } from '../Button';

class Tout extends Component {
  state = {
    isOpen: false,
  };

  toggleTout = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleClickOutside = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { isOpen } = this.state;
    const {
      additionalClasses,
      alertType,
      children,
      icon,
      id,
      isIconOnly,
      isInline,
      isToolTip,
      label,
      labelClassName,
      onClick,
      popupClassName,
      position,
      size,
    } = this.props;
    const isBottom = ['bottomLeft', 'bottomCenter', 'bottomRight'].includes(position);
    const popupName = classnames(popupClassName, `Tout-popup is-${position}`);
    const toutClassName = classnames('Tout', additionalClasses, {
      'is-open': isOpen,
      'Tout--alert': alertType === 'alert',
      'Tout--confirmation': alertType === 'confirmation',
      'Tout--error': alertType === 'error',
      'Tout--info': alertType === 'info',
      'Tout--inline': isInline,
      'Tout--toolTip': isToolTip,
    });
    const promptClassName = classnames('Tout-prompt', labelClassName, {
      'Tout-prompt--textSmall': size === 'small',
      'is-bottom': isBottom,
    });

    if (isInline) {
      return (
        <div className={toutClassName} role="tooltip" id={id}>
          {alertType && <span className={`icon icon-${alertType}`} />}
          {children}
        </div>
      );
    }

    if (isToolTip) {
      return (
        <div className={toutClassName} id={id}>
          {children || (
            <Button
              icon={icon}
              isIconOnly={isIconOnly}
              className={promptClassName}
              buttonType="button"
              label={label}
              onClick={onClick || (() => this.toggleTout())}
              onBlur={onClick ? null : () => this.toggleTout()}
            />
          )}
          <div role="tooltip" aria-hidden="true" className={popupName}>
            {label}
          </div>
        </div>
      );
    }

    return (
      <div className={`${toutClassName} ${additionalClasses}`} aria-haspopup="true">
        <Button
          buttonType="button"
          className={promptClassName}
          icon={icon}
          id={id}
          isIconOnly={isIconOnly}
          label={label}
          onBlur={() => this.toggleTout()}
          onClick={onClick || (() => this.toggleTout())}
        />
        <div role="tooltip" aria-labelledby={id} aria-hidden="true" className={popupName}>
          {children}
        </div>
      </div>
    );
  }
}

Tout.propTypes = {
  additionalClasses: PropTypes.string,
  alertType: PropTypes.oneOf(['info', 'error', 'alert', 'confirmation']),
  children: PropTypes.node,
  icon: PropTypes.string,
  id: PropTypes.string.isRequired,
  isIconOnly: PropTypes.bool,
  isInline: PropTypes.bool,
  isToolTip: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  onClick: PropTypes.func,
  popupClassName: PropTypes.string,
  position: PropTypes.oneOf([
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
    'rightCenter',
    'leftCenter',
  ]),
  size: PropTypes.string,
};

Tout.defaultProps = {
  additionalClasses: '',
  alertType: 'info',
  children: null,
  icon: '',
  isIconOnly: false,
  isInline: false,
  isToolTip: true,
  labelClassName: '',
  onClick: null,
  popupClassName: '',
  position: 'topCenter',
  size: '',
};

const ToutWithClickOutside = onClickOutside(Tout);

export { ToutWithClickOutside as Tout };
