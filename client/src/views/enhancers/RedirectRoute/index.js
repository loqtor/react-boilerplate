import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const RedirectRoute = ({ to }) => <Redirect to={{ pathname: to }} />;

RedirectRoute.propTypes = {
  to: PropTypes.string.isRequired,
};

export default RedirectRoute;
