export const email = 'hello@mustaquenadim.com';

export const socialMedia = [
  {
    name: 'GitHub',
    url: 'https://github.com/mustaquenadim',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mustaquenadim',
  },
  {
    name: 'X',
    url: 'https://x.com/0xmustaquenadim',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/mustaquenadim',
  },
  {
    name: 'Codepen',
    url: 'https://codepen.io/mustaquenadim',
  },
];

export const navLinks = [
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Services',
    url: '/#services',
  },
  {
    name: 'Experience',
    url: '/#jobs',
  },
  {
    name: 'Work',
    url: '/#projects',
  },
  {
    name: 'Blogs',
    url: '/#blogs',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
  {
    name: 'Posts',
    url: '/pensieve',
  },
];

export const colors = {
  green: '#4cc9f0',
  navy: '#0a192f',
  darkNavy: '#020c1b',
};

export const srConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: 'bottom',
  distance: '20px',
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
});
