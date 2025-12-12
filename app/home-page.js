'use client';

import { Layout } from '@components';
import { About, Contact, Featured, Hero, Jobs } from '@components';
import styled from 'styled-components';
import Blogs from '@components/sections/blogs';
import Services from '@components/sections/services';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

export default function HomePage({ jobsData, featuredProjects, servicesData }) {
  return (
    <Layout>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Services servicesData={servicesData} />
        <Jobs jobsData={jobsData} />
        <Featured featuredProjects={featuredProjects} />
        <Blogs />
        <Contact />
      </StyledMainContainer>
    </Layout>
  );
}
