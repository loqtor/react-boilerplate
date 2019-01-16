import React from 'react';
import { shallow } from 'enzyme';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';

import mountToDoc from '../../../tools/utilities/mountToDoc';

import { Button } from './index';

const setup = (render, props) => {
  const onClickSpy = jest.fn();

  const defaultProps = {
    disabledClass: '',
    isLinkButton: false,
    label: 'Continue',
    onClick: onClickSpy,
  };

  const component = render(<Button {...defaultProps} {...props} />);

  return {
    actual: component,
    onClickSpy,
  };
};

describe('<Button />', () => {
  it('renders correctly', () => {
    const { actual } = setup(shallow, {});
    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const { actual } = setup(shallow, { isDisabled: true });
    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders <a> tag correctly when is link', () => {
    const { actual } = setup(shallow, { isLinkButton: true, isRoute: false, url: '/' });
    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders <Link /> tag correctly when is link with route', () => {
    const { actual } = setup(shallow, { isLinkButton: true, isRoute: true, url: '/' });
    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders <Loader /> correctly when isLoading', () => {
    const { actual } = setup(shallow, { isLoading: true });
    expect(toJson(actual)).toMatchSnapshot();
  });

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
