import { srConfig } from '@/config';
import { usePrefersReducedMotion } from '@/hooks';
import sr from '@/utils/sr';
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
    width: 64px;
    height: 64px;
    margin: 0 32px;

    &:hover,
    &:focus {
      outline: 0;

      .img {
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

const skills = [
  { name: 'c-plus-plus', alt: 'C++' },
  { name: 'javascript', alt: 'JavaScript' },
  { name: 'typescript', alt: 'TypeScript' },
  { name: 'react-js', alt: 'ReactJS' },
  { name: 'next-js', alt: 'NextJS' },
  { name: 'tailwind-css', alt: 'Tailwind CSS' },
  { name: 'node-js', alt: 'NodeJS' },
  { name: 'postgresql', alt: 'PostgreSQL' },
  { name: 'docker', alt: 'Docker' },
  { name: 'vs-code', alt: 'VS Code' },
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
        {skills.map((skill, index) => (
          <div key={index} className="wrapper">
            <Image
              className="img"
              src={`/images/skills/${skill.name}.png`}
              alt={skill.alt}
              width={64}
              height={64}
              quality={95}
              priority={index < 4}
            />
          </div>
        ))}
      </Marquee>
    </StyledSkillsSection>
  );
};

export default Skills;
