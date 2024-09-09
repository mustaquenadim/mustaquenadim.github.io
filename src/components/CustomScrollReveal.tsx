import React, { useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  distance?: string;
}

const CustomScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 200,
  distance = '50px',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      ScrollReveal().reveal(sectionRef.current, {
        delay: delay,
        distance: distance,
        origin: 'bottom',
        duration: 1000,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
      });
    }
  }, [delay, distance]);

  return <div ref={sectionRef}>{children}</div>;
};

export default CustomScrollReveal;
