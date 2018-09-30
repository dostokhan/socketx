import React from 'react';
import { connect } from 'react-redux';

import SignUp from 'routes/SignUp/SignUp';
import Layout from '@Components/Layout/Layout';

const SignUpPage = () =>
  (
    <Layout>
      <SignUp />
    </Layout>
  );


export default connect()(SignUpPage);
