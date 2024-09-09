import { About, Contact, Featured, Hero, Jobs, Layout } from '@components';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Blogs from '../components/sections/blogs';
import Services from '../components/sections/services';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => {
  const router = useRouter();

  return (
    <Layout location={router}>
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
};

export default IndexPage;
