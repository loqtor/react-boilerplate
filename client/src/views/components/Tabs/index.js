import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Tabs extends Component {
  constructor(props) {
    super(props);

    let initial = 0;
    const { initialTab, headers } = props;

    if (initialTab !== null || initialTab !== undefined) {
      if (typeof initialTab === 'number') {
        initial = initialTab;
      } else if (typeof initialTab === 'string') {
        const index = headers.findIndex(heading => heading === initialTab);

        if (index !== -1) {
          initial = index;
        }
      }
    }

    this.state = {
      activeTabIndex: initial,
    };
  }

  setActiveTab = (activeTabIndex) => {
    const { activeTabIndex: currentTabIndex } = this.state;

    if (currentTabIndex === activeTabIndex) {
      return;
    }

    this.setState({
      activeTabIndex,
    });
  };

  createTabHeaders = (headers, activeTabIndex, setActiveTab, classes) => {
    if (headers.length <= 1) {
      return null;
    }

    const renderedHeaderItems = headers.map((header, index) => {
      const formattedHeader = header.replace(/\s+/g, '-').toLowerCase();

      return (
        <li
          className={classNames('Tab-item', { 'is-active': activeTabIndex === index })}
          key={formattedHeader}
          onClick={() => setActiveTab(index)}
          role="presentation"
        >
          <a
            aria-selected={activeTabIndex === index}
            className="Link"
            href={`#${formattedHeader}`}
            id={`${formattedHeader}-tab`}
            role="tab"
          >
            {header}
          </a>
        </li>
      );
    });

    return <div className={`Tab${classes}`}>{renderedHeaderItems}</div>;
  };

  render() {
    const { headers, renderActiveTab, className } = this.props;
    const { activeTabIndex } = this.state;
    const activeHeader = headers[activeTabIndex].replace(/\s+/g, '-').toLowerCase();
    const classes = className ? ` ${className}` : '';

    return (
      <ul role="tablist" className="Tabs">
        {this.createTabHeaders(headers, activeTabIndex, this.setActiveTab, classes)}
        <li aria-labelledby={`${activeHeader}-tab`} id={activeHeader} role="tabpanel">
          {renderActiveTab(activeTabIndex)}
        </li>
      </ul>
    );
  }
}

Tabs.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  initialTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderActiveTab: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
  className: null,
  initialTab: null,
};
