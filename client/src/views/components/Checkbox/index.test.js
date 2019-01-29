import React from 'react';
import { mount } from 'enzyme';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';

import mountToDoc from '../../../tools/utilities/mountToDoc';

import { Checkbox } from './index';

const setup = (render, props) => {
  const onChangeSpy = jest.fn();

  const defaultProps = {
    id: 'Subscribe',
    label: 'Subscribe to newsletter',
    onChange: onChangeSpy,
    name: 'Subscribe',
    value: 'Subscribe',
    className: 'Checkbox',
  };

  const component = render(<Checkbox {...defaultProps} {...props} />);

  return {
    actual: component,
    onChangeSpy,
  };
};

describe('<Checkbox />', () => {
  it('renders correctly', () => {
    const { actual } = setup(mount, {});

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders correctly when an error is present', () => {
    const { actual } = setup(mount, { error: 'Required field' });

    expect(toJson(actual)).toMatchSnapshot();
    expect(actual.find('.Checkbox-error').text()).toBe('Required field');
  });

  it('renders correctly when is disabled', () => {
    const { actual } = setup(mount, { isDisabled: true });

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders correctly when is isReadOnly', () => {
    const { actual } = setup(mount, { isReadOnly: true });

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('calls onChangeSpy correctly', () => {
    const { actual, onChangeSpy } = setup(mount, {});

    actual.find('input').simulate('change');
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
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
