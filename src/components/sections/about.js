import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Skills from './skills';
import Workstation from './workstation';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript',
    'TypeScript',
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'React Native',
    'Locofy',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              A warrior's weapon is his sword. A writer's weapon is his pen. And my weapon is
              programming. Over the past 7 years, programming has evolved from being my spare-time
              friend to a daily life habit.
            </p>

            <p>
              Throughout this journey, I've had the opportunity to work at{' '}
              <a href="https://bengalsoftware.com/">Bengal Software</a>,{' '}
              <a href="https://jouleslabs.com/">JoulesLabs</a> and{' '}
              <a href="https://techsistltd.com/">Techsist Limited</a>. Additionally, to share my
              programming knowledge and experience, I founded{' '}
              <a href="https://academy.mustaquenadim.com/">Mustaque Nadim Academy</a> and Passionate
              Programmer Community. I firmly believe that{' '}
              <b>
                &quot;Knowledge grows exponentially. The more we know, the greater our ability to
                learn, and the faster we expand our knowledge base.&quot;
              </b>{' '}
              - Dan Brown.
            </p>

            <p>
              My expertise is not limited to specific tools or technologies; I can learn and adapt
              to any. Here are a few technologies I’ve been working with recently:
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
      <Skills />
      <Workstation />
    </StyledAboutSection>
  );
};

export default About;
