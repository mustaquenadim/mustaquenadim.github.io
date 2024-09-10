'use client';

import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

const StyledSkillsSection = styled.div`
  margin-top: 2rem;

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
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
  }
`;

const imageSelector = imageName => {
  switch (imageName) {
    case 'c-plus-plus':
      return (
        <Image
          className="img"
          src="/images/skills/c-plus-plus.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="C++"
        />
      );
    case 'javascript':
      return (
        <Image
          className="img"
          src="/images/skills/javascript.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="JavaScript"
        />
      );
    case 'typescript':
      return (
        <Image
          className="img"
          src="/images/skills/typescript.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="TypeScript"
        />
      );
    case 'react-js':
      return (
        <Image
          className="img"
          src="/images/skills/react-js.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="ReactJS"
        />
      );
    case 'next-js':
      return (
        <Image
          className="img"
          src="/images/skills/next-js.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="NextJS"
        />
      );
    case 'tailwind-css':
      return (
        <Image
          className="img"
          src="/images/skills/tailwind-css.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Tailwind CSS"
        />
      );
    case 'node-js':
      return (
        <Image
          className="img"
          src="/images/skills/node-js.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="NodeJS"
        />
      );
    case 'postgresql':
      return (
        <Image
          className="img"
          src="/images/skills/postgresql.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="PostgreSQL"
        />
      );
    case 'docker':
      return (
        <Image
          className="img"
          src="/images/skills/docker.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Docker"
        />
      );
    case 'vs-code':
      return (
        <Image
          className="img"
          src="/images/skills/vs-code.png"
          fill={true}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="VS Code"
        />
      );
    default:
      return null; // Return null or a default image if preferred
  }
};

const Skills = () => {
  const revealContainer = useRef(null);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealServices = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealServices.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const skills = [
    'c-plus-plus',
    'javascript',
    'typescript',
    'react-js',
    'next-js',
    'tailwind-css',
    'node-js',
    'postgresql',
    'docker',
    'vs-code',
  ];

  return (
    <StyledSkillsSection>
      <Marquee autoFill="true" pauseOnHover="true" gradient="true" gradientColor="#0a192f">
        {skills.map((skill, index) => (
          <div key={index} className="wrapper">
            {imageSelector(skill)}
          </div>
        ))}
      </Marquee>
    </StyledSkillsSection>
  );
};

export default Skills;
