import React from 'react';
import { shallow, render } from 'enzyme';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';

import mountToDoc from '../../../tools/utilities/mountToDoc';

import { Loader } from './index';

const setup = (render, props) => {
  const component = render(<Loader {...props} />);

  return {
    actual: component,
  };
};

describe('index.test.jsx', () => {
  it('renders correctly', () => {
    const { actual } = setup(shallow, {});
    expect(toJson(actual)).toMatchSnapshot();
  });

  it('renders correctly when dot type', () => {
    const { actual } = setup(render, { type: 'dots' });
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
