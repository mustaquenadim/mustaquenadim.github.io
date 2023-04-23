import { css } from 'styled-components';
import variables from './variables';

const PreloaderStyles = css`
  ${variables};

  .preloader {
    background: var(--navy);
    height: 100vh;
    background-size: 0.12em 100%;
    font: 8em/1 Arial;
    transition: background 0.8s;
  }

  .preloader .text--line {
    font-size: 0.5em;
    font-weight: 600;
  }

  .preloader svg {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .preloader .text-copy {
    text-transform: uppercase;
    fill: none;
    stroke: white;
    stroke-dasharray: 7% 28%;
    stroke-width: 2px;
    -webkit-animation: stroke-offset 15s infinite linear;
    animation: stroke-offset 15s infinite linear;
  }

  .preloader .text-copy:nth-child(1) {
    stroke: var(--green);
    stroke-dashoffset: 7%;
  }

  .preloader .text-copy:nth-child(2) {
    stroke: var(--green);
    stroke-dashoffset: 14%;
  }

  .preloader .text-copy:nth-child(3) {
    stroke: var(--green);
    stroke-dashoffset: 21%;
  }

  .preloader .text-copy:nth-child(4) {
    stroke: var(--green);
    stroke-dashoffset: 28%;
  }

  .preloader .text-copy:nth-child(5) {
    stroke: var(--green);
    stroke-dashoffset: 35%;
  }

  @-webkit-keyframes stroke-offset {
    50% {
      stroke-dashoffset: 35%;
      stroke-dasharray: 0 87.5%;
    }
  }

  @keyframes stroke-offset {
    50% {
      stroke-dashoffset: 35%;
      stroke-dasharray: 0 87.5%;
    }
  }
`;

export default PreloaderStyles;
