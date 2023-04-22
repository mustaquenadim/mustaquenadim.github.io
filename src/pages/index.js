import { About, Contact, Featured, Hero, Jobs, Layout } from '@components';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Blogs from '../components/sections/blogs';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      {/* <Projects /> */}
      <Blogs />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
