'use client';

import { Email, Footer, Head, Loader, Nav, Social } from '@components';
import { GlobalStyle, theme } from '@styles';
import { usePathname, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

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
    if (!isLoading) {
      handleExternalLinks();
    }
  }, [isLoading, pathname, searchParams]);

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
    <>
      <Head />

      <div id="root">
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

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

export default Layout;
