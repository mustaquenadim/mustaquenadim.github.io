'use client';

import React from 'react';
import Link from 'next/link';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { Layout } from '@components';

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

export default function TagPage({ tag, posts }) {
  return (
    <Layout>
      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/pensieve">All memories</Link>
        </span>

        <h1>
          <span>#{tag}</span>
          <span>
            <Link href="/pensieve/tags">View all tags</Link>
          </span>
        </h1>

        <ul className="fancy-list">
          {posts.map((post) => {
            const { title, slug, date, tags } = post.frontmatter;
            return (
              <li key={slug}>
                <h2>
                  <Link href={`/${slug}`}>{title}</Link>
                </h2>
                <p className="subtitle">
                  <time>
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>&nbsp;&mdash;&nbsp;</span>
                  {tags &&
                    tags.length > 0 &&
                    tags.map((t, i) => (
                      <Link key={i} href={`/pensieve/tags/${kebabCase(t)}/`} className="tag">
                        #{t}
                      </Link>
                    ))}
                </p>
              </li>
            );
          })}
        </ul>
      </StyledTagsContainer>
    </Layout>
  );
}
