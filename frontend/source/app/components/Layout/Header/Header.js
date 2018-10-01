import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  signoutUser,
} from '@Redux/modules/auth';
import {
  Row,
  Column,
} from '@Styled/Responsive';
import { Anchor } from '@Styled/Elements';
import WithAuth from '@Components/WithAuth/WithAuth';
import UserName from '@Components/UserName/UserName';

import {
  HeaderWrap,
  // ContactRow,
  HeaderTag,
} from './Header.styled';


class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    event.preventDefault();
    console.log('signout user');
    this.props.signoutUser();
  }

  render() {
    return (
      <HeaderTag>
        <HeaderWrap>
          <Row>
            <Column>
              <Link
                href="/"
                passHref
              >
                <Anchor>Home</Anchor>
              </Link>
            </Column>
            <div>
              {
                !this.props.authorized && (
                  <Fragment>
                    <Link
                      href="/signin"
                      passHref
                    >
                      <Anchor>Sign In</Anchor>
                    </Link>
                    &nbsp;
                    <Link
                      href="/signup"
                      passHref
                    >
                      <Anchor>Sign Up</Anchor>
                    </Link>
                  </Fragment>
                )
              }
              {
                this.props.authorized && (
                  <Fragment>
                    <UserName name={this.props.authUser.username} />
                    &nbsp;
                    <Link
                      href="/signout"
                      passHref
                    >
                      <Anchor onClick={this.signOut}>Sign Out</Anchor>
                    </Link>
                  </Fragment>
                )
              }
            </div>
          </Row>
        </HeaderWrap>
      </HeaderTag>
    );
  }
}
Header.defaultProps = {
  authUser: null,
};
Header.propTypes = {
  authUser: PropTypes.object,
  authorized: PropTypes.bool.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signoutUser,
  }, dispatch);
export default WithAuth(connect(null, mapDispatchToProps)(Header));
