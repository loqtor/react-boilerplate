import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import selectorsApp from '../../../redux/modules/app/selectors';
import { USER_ROLES } from '../../../redux/modules/app/constants';

const SecureRoute = ({
  component: Component, permittedRoles, userRole, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const { location } = props;
      const isRoleAllowed = permittedRoles.includes(userRole);

      if (isRoleAllowed) {
        return <Component {...props} />;
      }

      return (
        <Redirect
          to={{
            pathname: '/registration',
            state: { from: location },
          }}
        />
      );
    }}
  />
);

SecureRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  location: PropTypes.shape({}).isRequired,
  permittedRoles: PropTypes.arrayOf(PropTypes.string.isRequired),
  userRole: PropTypes.string.isRequired,
};

SecureRoute.defaultProps = {
  permittedRoles: [USER_ROLES.USER],
  component: null,
};

const mapStateToProps = state => ({
  userRole: selectorsApp.getUserRole(state),
});

export default connect(
  mapStateToProps,
  null,
)(SecureRoute);
