import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Loader } from '../Loader';
import { Icon } from '../Icon';

/**
 * Button Component, configurable to produce a <button>,
 * <Link> or <a> tag.
 */
export class Button extends Component {
  handleClick = (proxy) => {
    const {
      isLinkButton, url, isRoute, onClick,
    } = this.props;

    /*
     * For the case when a link needs rendered and no
     * url is assigned.
     */
    if (isLinkButton && !url && !isRoute) {
      proxy.preventDefault();
    }

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  render() {
    const {
      buttonType,
      className,
      disabledClass,
      icon,
      // iconClass,
      isIconOnly,
      id,
      isDisabled,
      isFauxDisabled,
      isLinkButton,
      isLoading,
      isRoute,
      label,
      shouldOpennewTab,
      role,
      title,
      // wrapperClass,
      url,
    } = this.props;
    const target = shouldOpennewTab ? '_blank' : '';
    const hasButtonClass = className.includes('Button');
    const labelClassName = classnames({
      'Button-text': hasButtonClass,
      'u-hiddenVisually': isIconOnly,
    });

    // setup the common props for all variations
    const setupProps = {
      className,
      role,
      id,
      onClick: this.handleClick,
      title,
    };

    const innerContent = (
      <Fragment>
        {icon && <Icon name={icon} className={`icon icon-${icon}`} />}
        <span className={labelClassName}>{label}</span>
      </Fragment>
    );

    if (isLinkButton && isRoute) {
      return (
        <Link {...setupProps} to={url} role={role}>
          {innerContent}
        </Link>
      );
    }

    if (isLinkButton && !isRoute) {
      return (
        <a {...setupProps} href={url} target={target} rel="noopener noreferrer">
          {innerContent}
        </a>
      );
    }

    return (
      // eslint-disable-next-line
      <button
        type={buttonType}
        className={classnames(className, {
          [disabledClass]: isDisabled,
          [disabledClass]: isFauxDisabled,
          'is-loading': isLoading,
          'has-icon': icon,
        })}
        onClick={this.handleClick}
        disabled={isDisabled}
        title={title}
        role={role}
        id={id}
      >
        {isLoading && (
          <div>
            <Loader />
            <span className={`${labelClassName} u-hiddenVisually`}>{label}</span>
          </div>
        )}

        {!isLoading && innerContent}
      </button>
    );
  }
}

Button.propTypes = {
  buttonType: PropTypes.string,
  className: PropTypes.string,
  disabledClass: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFauxDisabled: PropTypes.bool,
  isIconOnly: PropTypes.bool,
  isLinkButton: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRoute: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  role: PropTypes.string,
  shouldOpennewTab: PropTypes.bool,
  title: PropTypes.string,
  url: PropTypes.string,
  wrapperClass: PropTypes.string,
};

Button.defaultProps = {
  buttonType: 'Submit',
  className: '',
  disabledClass: 'Button is-disabled',
  icon: '',
  iconClass: null,
  id: null,
  isDisabled: false,
  isFauxDisabled: false,
  isIconOnly: false,
  isLinkButton: false,
  isLoading: false,
  isRoute: false,
  label: '',
  onClick: null,
  role: null,
  shouldOpennewTab: false,
  title: '',
  url: '',
  wrapperClass: '',
};
