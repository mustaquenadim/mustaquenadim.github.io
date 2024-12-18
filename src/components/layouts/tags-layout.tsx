'use client';

import Layout from '@components/layout';
import styled from 'styled-components';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: var(--light-slate);

    li {
      font-size: var(--fz-lg);

      a {
        color: var(--light-slate);

        .count {
          color: var(--slate);
          font-family: var(--font-mono);
          font-size: var(--fz-md);
        }
      }
    }
  }
`;

const TagsLayout = ({ children }) => {
  return (
    <Layout>
      <StyledTagsContainer>{children}</StyledTagsContainer>
    </Layout>
  );
};

export default TagsLayout;
