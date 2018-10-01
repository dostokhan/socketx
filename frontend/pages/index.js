import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Layout from '@Components/Layout/Layout';
import Home from 'routes/Home/Home';

const Index = () =>
  (
    <Layout>
      <Home />
    </Layout>
  );

export default connect()(Index);
