import React from 'react';
import { shallow } from 'enzyme';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';
import { StaticRouter } from 'react-router-dom';

import shallowToDoc from '../../../tools/utilities/mountToDoc';
import mockStore from '../../../tools/utilities/mockStore';

import Menu from './index';

const setup = (render, props) => {
  const handleLogoutSpy = jest.fn();
  const store = mockStore;

  const defaultProps = {
    isOpen: true,
    logOut: handleLogoutSpy,
  };

  const component = render(
    <StaticRouter store={store}>
      <Menu {...defaultProps} {...props} />
    </StaticRouter>,
  );

  return {
    actual: component,
    handleLogoutSpy,
  };
};

describe('<Menu />', () => {
  it('renders correctly', () => {
    const { actual } = setup(shallow, {});

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('has no accessibility violations', (done) => {
    const { actual } = setup(shallowToDoc, {});
    const componentNode = actual.getDOMNode();

    axe.run(componentNode, (err, { violations }) => {
      expect(err).toBe(null);
      expect(violations).toHaveLength(0);
      done();
    });
  });
});
