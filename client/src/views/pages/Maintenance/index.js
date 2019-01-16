import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

const Maintenance = () => (
  <Fragment>
    <p>
      <FormattedMessage id="SITE_DOWN_FOR_MAINTENANCE" />
    </p>
  </Fragment>
);

export default withRouter(Maintenance);
