import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledWorkStationSection = styled.section`
  max-width: 900px;
  padding-bottom: 0;

  h2 {
    text-align: center;
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    margin-top: 48px;

    @media (max-width: 768px) {
      display: block;
    }

    .other-devices {
      margin-top: 24px;
    }
  }
`;
const StyledText = styled.div`
  h3:not(:first-child) {
    margin-top: 24px;
  }

  ul.specs-list {
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      // font-family: var(--font-mono);
      font-size: var(--fz-lg);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-lg);
        line-height: 24px;
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

const Workstation = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const workstation = {
    device: 'Laptop',
    brand: 'HP',
    model: '15s-eq3234AU',
    specification: [
      {
        hardware: 'Processor',
        info: 'AMD Ryzen 5 5625U (16MB L3 Cache, 2.3GHz, up to 4.3GHz)',
      },
      {
        hardware: 'RAM',
        info: '16GB DDR4',
      },
      {
        hardware: 'Storage',
        info: '512GB SSD',
      },
      {
        hardware: 'Display',
        info: '15" FHD (1920 x 1080)',
      },
      {
        hardware: 'Graphics',
        info: 'AMD Radeon Graphics (Shared)',
      },
      {
        hardware: 'Operating System',
        info: 'Windows 11 Pro',
      },
    ],
    'peripheral-device': [
      {
        hardware: 'Monitor',
        info: 'HP V194 18.5-inch Monitor',
      },
      {
        hardware: 'Mouse',
        info: 'A4TECH G3-300N V-Track Wireless Mouse',
      },
      {
        hardware: 'Graphic Tablet',
        info: 'VEIKK A50',
      },
      {
        hardware: 'Microphone',
        info: 'Boya BY-M1',
      },
    ],
  };

  return (
    <StyledWorkStationSection id="workstation" ref={revealContainer}>
      <h2>My Workstation</h2>

      <div className="inner">
        <StyledText>
          <div>
            <h3>Device: {workstation.device}</h3>
            <p>
              {workstation.brand} {workstation.model}
            </p>
          </div>

          <ul className="specs-list">
            {workstation &&
              workstation.specification.map(({ hardware, info }, i) => (
                <li key={i}>
                  <strong>{hardware}:</strong> {info}
                </li>
              ))}
          </ul>

          <div className="other-devices">
            <h3>Peripheral Devices</h3>
          </div>
          <ul className="specs-list">
            {workstation &&
              workstation?.['peripheral-device'].map(({ hardware, info }, i) => (
                <li key={i}>
                  <strong>{hardware}:</strong> {info}
                </li>
              ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/workstation.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledWorkStationSection>
  );
};

export default Workstation;
