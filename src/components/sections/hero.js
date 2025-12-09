import { usePrefersReducedMotion } from '@hooks';
import { loaderDelay, navDelay } from '@utils';
import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import Companies from './companies';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .button-group {
    display: flex;
    gap: 12px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .highlighted-box {
    border-radius: 300px;
    display: block;
    margin-top: 18px;
  }

  .highlighted-box a {
    background: linear-gradient(to right, #80ed99, #57cc99, #38a3a5, #57cc99, #80ed99);
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate-gradient 4s linear infinite;
  }

  @keyframes animate-gradient {
    0% {
      background-position: 0%;
    }
    20% {
      background-position: 100%;
    }
    50% {
      background-position: 200%;
    }
    80% {
      background-position: 100%;
    }
    100% {
      background-position: 0%;
    }
  }
`;

const TEXTS = [
  'JavaScript Freak',
  'Aspiringpreneur',
  'Product Enthusiast',
  'Instructor',
  'Content Creator',
];

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(index => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mustaque Nadim</h2>;
  const three = (
    <h3 className="big-heading">
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h3>
  );
  const four = (
    <>
      <p>
        I’m a passionate programmer from Bangladesh with entrepreneurial spirit, experienced in
        building large scale web application using MERN technologies.
      </p>
    </>
  );
  const five = (
    <div className="button-group">
      <a className="email-link" href="#contact">
        Hire me
      </a>
      {/* <a
        className="email-link"
        href="/Mustaque-Nadim-Software-Engineer-Resume.pdf"
        target="_blank"
        rel="noreferrer">
        Download Resume
      </a> */}
    </div>
  );

  const six = (
    <div className="highlighted-box">
      <span>
        Do you have a project? Let's{' '}
        <a href="https://cal.com/mustaquenadim/15min" target="_blank" rel="noreferrer">
          schedule a meeting.
        </a>
      </span>
    </div>
  );

  const seven = <Companies />;

  const items = [one, two, three, four, five, seven];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
