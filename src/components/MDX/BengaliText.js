import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledBengaliText = styled.span`
  font-family: var(--font-hind);
  color: red;
  background-color: yellow;
`;

const BengaliText = ({ children }) => (
  <StyledBengaliText className="">{children}</StyledBengaliText>
);

BengaliText.propTypes = {
  children: PropTypes.string,
};

export default BengaliText;
