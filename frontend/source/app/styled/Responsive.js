import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

// export const Row = styled.div`
//   display: flex;
//   box-sizing: border-box;
// `;
export const Container = styled.div`
  position: relative;
  max-width: 100rem;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

export const Row = props => (
  <Flex
    {...props}
  />
);

export const Column = props => (
  <Box
    flex="1 1 auto"
    {...props}
  />
);

export const Column2 = props => (
  <Column
    {...props}
    width={[1, 1 / 2]}
  />
);

// flex="0 0 50%"
