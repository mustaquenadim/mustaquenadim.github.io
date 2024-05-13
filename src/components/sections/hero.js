import { usePrefersReducedMotion } from '@hooks';
import { loaderDelay, navDelay } from '@utils';
import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
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

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const TEXTS = ['CS Student', 'Web Developer', 'Problem Solver', 'Software Engineer'];

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

  const one = <h1>👋👋 Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mujtaba Rehman</h2>;
  // const three = <h3 className="big-heading">Full Stack Developer</h3>;
  const three = (
    <h3 className="big-heading">
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h3>
  );
  const four = (
    <>
      <p>
        I’m a 3rd year Computer Science student at the University of Waterloo, with a focus on
        software development using new web technologies.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="/Mustaque-Nadim-Software-Engineer-Resume.pdf"
      target="_blank"
      rel="noreferrer">
      Hire me
    </a>
  );

  const items = [one, two, three, four, five];

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
