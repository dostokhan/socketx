import React from 'react';
import { connect } from 'react-redux';

import SignIn from 'routes/SignIn/SignIn';
import Layout from '@Components/Layout/Layout';

const SignInPage = () =>
  (
    <Layout>
      <SignIn />
    </Layout>
  );


export default connect()(SignInPage);
