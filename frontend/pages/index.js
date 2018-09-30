import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Layout from '@Components/Layout/Layout';
import Home from 'routes/Home/Home';
// import initialize from 'utils/initialize';

class Index extends PureComponent {
  // static getInitialProps(ctx) {
  //   initialize(ctx);
  // }

  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }
}

export default connect()(Index);
