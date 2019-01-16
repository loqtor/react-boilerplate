import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';

const Menu = (props) => {
  const { isOpen } = props;
  const menuClassName = classnames('Menu Menu--sitewide', { 'is-open': isOpen });

  return (
    <nav className={menuClassName} aria-hidden={!isOpen}>
      <h2 className="u-hiddenVisually">
        <FormattedMessage id="MENU" />
      </h2>

      <ul className="Menu-list">
        <li className="Menu-list-item">
          <Link to="/shows/10">Menu item</Link>
        </li>
        <li className="Menu-list-item">
          <Link to="/shows/10">Menu item</Link>
        </li>
        <li className="Menu-list-item">
          <Link to="/shows/10">Menu item</Link>
        </li>
      </ul>

      <div className="Hamburger">
        <span />
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
};

Menu.defaultProps = {
  history: {},
  isOpen: false,
};

const MenuWithRouter = withRouter(injectIntl(Menu));

export { MenuWithRouter as Menu };
