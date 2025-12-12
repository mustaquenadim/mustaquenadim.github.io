'use client';

import React from 'react';
import Link from 'next/link';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { Layout } from '@components';

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

export default function TagsPage({ tags }) {
  return (
    <Layout>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/pensieve">All memories</Link>
        </span>

        <h1>Tags</h1>
        <ul className="fancy-list">
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link href={`/pensieve/tags/${kebabCase(tag.fieldValue)}/`} className="inline-link">
                {tag.fieldValue} <span className="count">({tag.totalCount})</span>
              </Link>
            </li>
          ))}
        </ul>
      </StyledTagsContainer>
    </Layout>
  );
}
