import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
import { StaticImage } from 'gatsby-plugin-image';
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

const imageSelector = imageName => {
  switch (imageName) {
    case 'techsist':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/techsist.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Techsist Limited"
        />
      );
    case 'jouleslabs':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/jouleslabs.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="JoulesLabs"
        />
      );
    case 'reviewxpo':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/reviewxpo.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="ReviewXpo"
        />
      );
    case 'bengal-software':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/bengal-software.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Bengal Software"
        />
      );
    case 'the-korean-mall':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/the-korean-mall.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="The Korean Mall"
        />
      );
    case 'payvill':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/payvill.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Payvill"
        />
      );
    case 'metrocem':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/metrocem.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Metrocem Group"
        />
      );
    case 'adstation':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/adstation.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="AdStation"
        />
      );
    case 'zyntrix':
      return (
        <StaticImage
          className="img"
          src="../../../content/companies/zyntrix.png"
          height={64}
          quality={95}
          objectFit="contain"
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Zyntrix"
        />
      );
    default:
      return null; // Return null or a default image if preferred
  }
};

const Companies = () => {
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

  const companies = [
    'techsist',
    'jouleslabs',
    'bengal-software',
    'the-korean-mall',
    'payvill',
    'metrocem',
    'adstation',
    'zyntrix',
  ];

  return (
    <StyledCompaniesSection>
      <div className="title-container">
        <p className="title-text">Companies I've worked with</p>
      </div>
      <div className="marquee-container">
        <Marquee autoFill="true" pauseOnHover="true" gradient="true" gradientColor="#0a192f">
          {companies.map((company, index) => (
            <div key={index} className="wrapper">
              {imageSelector(company)}
            </div>
          ))}
        </Marquee>
      </div>
    </StyledCompaniesSection>
  );
};

export default Companies;
