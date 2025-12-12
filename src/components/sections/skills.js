'use client';

import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

const StyledSkillsSection = styled.div`
  margin-top: 2rem;

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: auto;
    margin: 0 32px;

    &:hover,
    &:focus {
      outline: 0;

      .img {
        -webkit-filter: grayscale(0); /* Safari 6.0 - 9.0 */
        filter: grayscale(0);
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    @media (max-width: 768px) {
      margin: 16px 16px 0;
      .img {
        max-width: 40px;
      }
    }
  }
`;

const skillsData = [
  { name: 'c-plus-plus', alt: 'C++', src: '/content/skills/c-plus-plus.png' },
  { name: 'javascript', alt: 'JavaScript', src: '/content/skills/javascript.png' },
  { name: 'typescript', alt: 'TypeScript', src: '/content/skills/typescript.png' },
  { name: 'react-js', alt: 'ReactJS', src: '/content/skills/react-js.png' },
  { name: 'next-js', alt: 'NextJS', src: '/content/skills/next-js.png' },
  { name: 'tailwind-css', alt: 'Tailwind CSS', src: '/content/skills/tailwind-css.png' },
  { name: 'node-js', alt: 'NodeJS', src: '/content/skills/node-js.png' },
  { name: 'postgresql', alt: 'PostgreSQL', src: '/content/skills/postgresql.png' },
  { name: 'docker', alt: 'Docker', src: '/content/skills/docker.png' },
  { name: 'vs-code', alt: 'VS Code', src: '/content/skills/vs-code.png' },
];

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledSkillsSection ref={revealContainer}>
      <Marquee autoFill={true} pauseOnHover={true} gradient={true} gradientColor="#0a192f">
        {skillsData.map((skill, index) => (
          <div key={index} className="wrapper">
            <Image
              className="img"
              src={skill.src}
              height={64}
              width={64}
              alt={skill.alt}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </Marquee>
    </StyledSkillsSection>
  );
};

export default Skills;
