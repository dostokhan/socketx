import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import {
  authLoading,
  isAuthenticated,
  signIn,
} from '@Redux/modules/auth';
import {
  Container,
  Row,
  Column,
} from '@Styled/Responsive';
const FormContainer = styled(Column)`
  max-width: 40rem;
`;
// import Loader from 'components/Loader/Loader';

import SignInForm from './SignInForm/SignInForm';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.authenticated) {
      Router.push('/');
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSubmit(event) {
    this.props.signIn(this.state);
    event.preventDefault();
  }
  render() {
    return (
      <Container>
        <Row justifyContent="center" flexWrap="wrap">
          <FormContainer>
            <SignInForm
              loading={this.props.loading}
              username={this.state.username}
              password={this.state.password}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          </FormContainer>
        </Row>
      </Container>
    );
  }
}

SignIn.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
  ({
    loading: authLoading(state),
    authenticated: isAuthenticated(state),
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signIn,
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
