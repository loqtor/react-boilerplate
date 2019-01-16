import React from 'react';
import { mount, shallow } from 'enzyme';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';

import mountToDoc from '../../../tools/utilities/mountToDoc';

import Footer from './index';

const setup = (render, props) => {
  const toggleSheetSpy = jest.fn();

  const defaultProps = {
    toggleSheet: toggleSheetSpy,
  };

  const component = render(<Footer {...defaultProps} {...props} />);

  return {
    actual: component,
    toggleSheetSpy,
  };
};

describe('index.test.jsx', () => {
  it('renders correctly', () => {
    const { actual } = setup(mount, {});
    expect(toJson(actual)).toMatchSnapshot();
  });

  it('calls toggleSheetSpy correctly', () => {
    const { actual, toggleSheetSpy } = setup(shallow, {});

    actual
      .find('.Footer-link')
      .first()
      .simulate('click');
    expect(toggleSheetSpy).toHaveBeenCalledTimes(1);
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
