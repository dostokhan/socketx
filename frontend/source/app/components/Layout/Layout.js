import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import theme from 'ui/theme';


import Header from './Header/Header';

const PageContent = styled.div`
  min-height: 100vh;
  position: relative;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.background};
`;

class Layout extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PageContent>
          <Header />
          { this.props.children }
        </PageContent>
      </ThemeProvider>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
