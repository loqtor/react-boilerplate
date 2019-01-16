import React from 'react';
import { mount } from 'enzyme';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';

import mountToDoc from '../../../tools/utilities/mountToDoc';

import Tout from './index';

const setup = (render, props) => {
  const defaultProps = {
    label: 'Hello',
    id: 'Tout-helloWorld',
    children: <p>World</p>,
  };

  const component = render(<Tout {...defaultProps} {...props} />);
  const wrappedComponent = render(
    <div className="Tout-wrapper">
      <Tout {...defaultProps} {...props} />
    </div>,
  );

  return {
    actual: component,
    wrappedActual: wrappedComponent,
  };
};

describe('<Tout />', () => {
  it('renders correctly', () => {
    const { actual } = setup(mount, {});

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders correctly when small variety', () => {
    const { actual } = setup(mount, { size: 'small' });

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders correctly when inline variety', () => {
    const { actual } = setup(mount, { isInline: true });

    expect(toJson(actual)).toMatchSnapshot();
  });

  it('applies the *is-open* class & opens on button click', () => {
    const { actual } = setup(mount, { children: null });

    actual.find('button').simulate('click');

    expect(toJson(actual)).toMatchSnapshot();
    expect(actual.find('.Tout').hasClass('is-open')).toBeTruthy();
  });

  it('removes the *is-open* class & closes on click outside', () => {
    const { wrappedActual, actual } = setup(mount, { children: null });

    wrappedActual.find('.Tout-wrapper').simulate('click');

    expect(toJson(actual)).toMatchSnapshot();
    expect(actual.find('.Tout').hasClass('is-open')).toBeFalsy();
  });

  // it('has no accessibility violations', (done) => {
  //   const { actual } = setup(mountToDoc, {});
  //   const componentNode = actual.getDOMNode();
  //
  //   axe.run(componentNode, (err, { violations }) => {
  //     expect(err).toBe(null);
  //     expect(violations).toHaveLength(0);
  //     done();
  //   });
  // });
});
