import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import axe from 'axe-core';

import mountToDoc from '../../../tools/utilities/mountToDoc';

import { Header } from './index';

const setup = (render, props) => {
  const toggleMobileMenuSpy = jest.fn();

  const defaultProps = {
    toggleMobileMenu: toggleMobileMenuSpy,
    mobileMenuIsOpen: false,
  };

  const component = render(
    <StaticRouter context={{}}>
      <Header {...defaultProps} {...props} />
    </StaticRouter>,
  );

  return {
    actual: component,
    toggleMobileMenuSpy,
  };
};

describe('index.test.jsx', () => {
  it('renders correctly', () => {
    const { actual } = setup(shallow, {});

    expect(toJson(actual)).toMatchSnapshot();
  });

  // it('renders with the correct class when the mobile menu is open', () => {
  //   const { actual } = setup(mount, { mobileMenuIsOpen: true });
  //
  //   expect(actual.find('.Hamburger').hasClass('is-open')).toBeTruthy();
  // });

  it('has no accessibility violations', (done) => {
    const { actual } = setup(mountToDoc, {});
    const componentNode = actual.getDOMNode();

    axe.run(componentNode, (err, { violations }) => {
      expect(err).toBe(null);
      expect(violations).toHaveLength(0);
      done();
    });
  });
});
