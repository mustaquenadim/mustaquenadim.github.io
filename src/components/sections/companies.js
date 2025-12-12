'use client';

import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

const StyledCompaniesSection = styled.div`
  margin-top: 2rem;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }

  .title-container {
    text-align: center;
    margin-bottom: 1rem;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
      max-width: 11rem;
      min-width: 11rem;
      border-right: 1px solid var(--lightest-navy);
      padding-right: 1.5rem;
      margin-bottom: 0;
      text-align: end;
    }
  }

  .title-text {
    font-size: var(--fz-md);

    @media (min-width: 768px) {
      font-size: var(--fz-lg);
    }
  }

  .marquee-container {
    flex: 1;
    overflow: hidden;
    min-width: 0;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: auto;
    margin: 0 24px;

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

    @media (max-width: 480px) {
      margin: 0 16px;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      margin: 0 20px;
    }
  }
`;

const companiesData = [
  { name: 'techsist', alt: 'Techsist Limited', src: '/content/companies/techsist.png' },
  { name: 'jouleslabs', alt: 'JoulesLabs', src: '/content/companies/jouleslabs.png' },
  { name: 'bengal-software', alt: 'Bengal Software', src: '/content/companies/bengal-software.png' },
  { name: 'payvill', alt: 'Payvill', src: '/content/companies/payvill.png' },
  { name: 'metrocem', alt: 'Metrocem Group', src: '/content/companies/metrocem.png' },
  { name: 'adstation', alt: 'AdStation', src: '/content/companies/adstation.png' },
  { name: 'zyntrix', alt: 'Zyntrix', src: '/content/companies/zyntrix.png' },
];

const Companies = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledCompaniesSection ref={revealContainer}>
      <div className="title-container">
        <p className="title-text">Companies I've worked with</p>
      </div>
      <div className="marquee-container">
        <Marquee autoFill={true} pauseOnHover={true} gradient={true} gradientColor="#0a192f">
          {companiesData.map((company, index) => (
            <div key={index} className="wrapper">
              <Image
                className="img"
                src={company.src}
                height={64}
                width={120}
                alt={company.alt}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </StyledCompaniesSection>
  );
};

export default Companies;
