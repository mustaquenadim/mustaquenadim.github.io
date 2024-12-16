'use client';

import { Layout } from '@components';
import kebabCase from 'lodash/kebabCase';
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

const TagsPage = () => {
  const router = useRouter();

  return (
    <Layout location={router}>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blogs">All memories</Link>
        </span>

        <h1>Tags</h1>
        <ul className="fancy-list">
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link href={`/blogs/tags/${kebabCase(tag.fieldValue)}/`} className="inline-link">
                {tag.fieldValue} <span className="count">({tag.totalCount})</span>
              </Link>
            </li>
          ))}
        </ul>
      </StyledTagsContainer>
    </Layout>
  );
};

export default TagsPage;
