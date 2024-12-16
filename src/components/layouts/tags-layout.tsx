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
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blogs">All memories</Link>
        </span>

        <h1>Tags</h1>
        {children}
      </StyledTagsContainer>
    </Layout>
  );
};

export default TagsLayout;
