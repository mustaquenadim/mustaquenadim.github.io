'use client';

import Layout from '@components/layout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const StyledTagsContainer = styled.main`
  max-width: 1000px;

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  h1 {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 50px;

    a {
      font-size: var(--fz-lg);
      font-weight: 400;
    }
  }

  ul {
    li {
      font-size: 24px;
      h2 {
        font-size: inherit;
        margin: 0;
        a {
          color: var(--light-slate);
        }
      }
      .subtitle {
        color: var(--slate);
        font-size: var(--fz-sm);

        .tag {
          margin-right: 10px;
        }
      }
    }
  }
`;

const TagPageLayout = ({ children }) => {
  const router = useRouter();
  return (
    <Layout location={router}>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blogs">All memories</Link>
        </span>

        {children}
      </StyledTagsContainer>
    </Layout>
  );
};

export default TagPageLayout;
