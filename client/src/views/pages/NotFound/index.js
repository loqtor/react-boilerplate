import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

const PageNotFound = () => (
  <Fragment>
    <p>
      <FormattedMessage id="404" />
    </p>
  </Fragment>
);

export default withRouter(PageNotFound);
