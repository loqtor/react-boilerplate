import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { Menu } from '../Menu';

export const Header = () => (
  <header className="Header">
    <h1 className="u-hiddenVisually">
      <FormattedMessage id="APP_TITLE" />
    </h1>

    <div className="Header-sitewide">
      <div className="Container">
        <div className="Header-wrapper">
          <h2 className="Header-logo">
            <Link to="/">
              <span className="u-hiddenVisually">
                <FormattedMessage id="HOME" />
              </span>
            </Link>
          </h2>

          <Menu />

          <Button className="Header-search" title="Search" />
        </div>
      </div>
    </div>
  </header>
);
