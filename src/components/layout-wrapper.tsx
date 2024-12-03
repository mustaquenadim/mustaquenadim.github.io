'use client';

import { GlobalStyle, theme } from '@styles';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Email from './email';
import Footer from './footer';
import Loader from './loader';
import Nav from './nav';
import Social from './social';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  useEffect(() => {
    // const handleContextmenu = e => {
    //   e.preventDefault();
    // };
    // document.addEventListener('contextmenu', handleContextmenu);
    // return function cleanup() {
    //   document.removeEventListener('contextmenu', handleContextmenu);
    // };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <a className="skip-to-content" href="#content">
        Skip to Content
      </a>

      {isLoading && isHome ? (
        <Loader finishLoading={() => setIsLoading(false)} />
      ) : (
        <StyledContent>
          <Nav isHome={isHome} />
          <Social isHome={isHome} />
          <Email isHome={isHome} />
          <div id="content">{children}</div>
          <Footer />
        </StyledContent>
      )}
    </ThemeProvider>
  );
};

export default LayoutWrapper;
