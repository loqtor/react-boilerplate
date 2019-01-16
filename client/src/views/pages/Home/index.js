import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from '../../connectors/Footer';
import Header from '../../connectors/Header';

const HomePage = (props) => {
  const { isLoading } = props;

  return (
    <Fragment>
      <Header />
      <main className="Main" data-loaded={!isLoading}>
        <div className="Container">
          <h1>H1 - lorem ipsum dolor sit amet</h1>
          <h2>H2 - lorem ipsum dolor sit amet</h2>
          <h3>H3 - lorem ipsum dolor sit amet</h3>
          <h4>H4 - lorem ipsum dolor sit amet</h4>
          <h5>H5 - lorem ipsum dolor sit amet</h5>
          <h6>H6 - lorem ipsum dolor sit amet</h6>
          <p className="lead">1234567890</p>
          <p>
            Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius, ex nec
            sodales ultrices, odio nulla euismod nunc, a pharetra nisi ligula ac elit. Suspendisse
            scelerisque eu massa aliquet malesuada…
          </p>
          <p className="small">
            Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius, ex
            nec sodales ultrices, odio nulla euismod nunc, a pharetra nisi ligula ac elit.
            Suspendisse scelerisque eu massa aliquet malesuada…
          </p>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

HomePage.propTypes = {
  isLoading: PropTypes.bool,
};

HomePage.defaultProps = {
  isLoading: false,
};

export default withRouter(HomePage);
