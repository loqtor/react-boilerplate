import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import { version } from '../../../../package.json';
import { FEATURE_BRANCH, COMMIT_HASH } from '../../../redux/modules/app/constants';

export const Footer = () => {
  // const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';
  const featureBranch = FEATURE_BRANCH && FEATURE_BRANCH !== '' ? `${FEATURE_BRANCH}` : '';
  const commitHash = COMMIT_HASH && COMMIT_HASH ? ` - ${COMMIT_HASH}` : '';
  const versionClass = classnames('Footer-version u-hiddenVisually', {
    // 'u-hiddenVisually': isProduction,
  });

  return (
    <footer className="Footer">
      <h2 className="u-hiddenVisually">
        <FormattedMessage id="SITE_INFORMATION" />
      </h2>
      <p className={versionClass}>
        Version: {version}
        {featureBranch}
        {commitHash}
      </p>
    </footer>
  );
};
