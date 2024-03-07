import { About, Contact, Featured, Hero, Jobs, Layout } from '@components';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Blogs from '../components/sections/blogs';
import Services from '../components/sections/services';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
