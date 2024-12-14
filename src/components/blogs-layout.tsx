'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Layout from './layout';

const StyledMainContainer = styled.main`
  & > header {
    margin-bottom: 100px;
    text-align: center;

    a {
      &:hover,
      &:focus {
        cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>⚡</text></svg>")
            20 0,
          auto;
      }
    }
  }

  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
  }
`;

const BlogsLayout = ({ children }) => {
  const router = useRouter();

  return (
    <Layout location={router}>
      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Posts</h1>
          <p className="subtitle">
            <a href="https://www.wizardingworld.com/writing-by-jk-rowling/pensieve">
              a collection of memories
            </a>
          </p>
        </header>
        {children}
      </StyledMainContainer>
    </Layout>
  );
};

export default BlogsLayout;
