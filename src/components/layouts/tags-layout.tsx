'use client';

import Layout from '@components/layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  h1 {
    margin-bottom: 50px;
  }
  ul {
    color: var(--light-slate);

    li {
      font-size: var(--fz-xxl);

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
  const router = useRouter();
  return (
    <Layout location={router}>
      <StyledTagsContainer>{children}</StyledTagsContainer>
    </Layout>
  );
};

export default TagsLayout;
