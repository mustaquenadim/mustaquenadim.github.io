import { About, Contact, Featured, Hero, Jobs, Layout } from '@components';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Blogs from '../components/sections/blogs';
import Services from '../components/sections/services';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Services />
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
