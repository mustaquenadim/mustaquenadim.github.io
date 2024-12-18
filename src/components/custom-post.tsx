'use client';

import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Layout from './layout';

const StyledPostContainer = styled.main`
  max-width: 1000px;
`;

const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;

const components = {};

interface CustomPostProps {
  data: any;
  content?: any;
  children?: any;
}

const CustomPost = ({ data, content, children }: CustomPostProps) => {
  const router = useRouter();
  const { title, date, tags } = data;

  return (
    <Layout location={router}>
      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link href="/blogs">All memories</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-heading">{title}</h1>
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
              tags.map((tag, i) => (
                <Link key={i} href={`/blogs/tags/${kebabCase(tag)}/`} className="tag">
                  #{tag}
                </Link>
              ))}
          </p>
        </StyledPostHeader>

        <StyledPostContent>{children}</StyledPostContent>
      </StyledPostContainer>
    </Layout>
  );
};

export default CustomPost;
