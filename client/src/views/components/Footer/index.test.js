import React from 'react';
import axe from 'axe-core';
import toJson from 'enzyme-to-json';
import { injectIntl } from 'react-intl';

import mountToDoc from '../../../tools/utilities/mountToDoc';
import { shallowWithIntl } from '../../../tools/utilities/enzymeIntlTestHelper';

import { Footer } from './index';

const FooterWithIntl = injectIntl(Footer);

const setup = (render, props) => {
  const defaultProps = {
  };

  const component = render(<FooterWithIntl {...defaultProps} {...props} />);

  return {
    actual: component,
  };
};

describe('index.test.jsx', () => {
  it('renders correctly', () => {
    const { actual } = setup(shallowWithIntl, {});
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
