import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import {
  authLoading,
  isAuthenticated,
  signUp,
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

import SignUpForm from './SignUpForm/SignUpForm';

class SignUp extends Component {
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
    this.props.signUp(this.state, Router);
    event.preventDefault();
  }
  render() {
    return (
      <Container>
        <Row justifyContent="center" flexWrap="wrap">
          <FormContainer>
            <SignUpForm
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

SignUp.propTypes = {
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
  ({
    loading: authLoading(state),
    authenticated: isAuthenticated(state),
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signUp,
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
