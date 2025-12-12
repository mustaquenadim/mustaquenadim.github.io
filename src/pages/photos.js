import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled, { keyframes } from 'styled-components';
import { Layout } from '@components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const lightboxFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledMainContainer = styled.main`
  & > header {
    margin-bottom: 80px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledSubtitle = styled.p`
  color: var(--slate);
  font-size: var(--fz-lg);
  max-width: 600px;
  margin: 20px auto 0;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-align: center;
  display: block;
`;

const StyledFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const StyledFilterButton = styled.button`
  background: ${({ $active }) => ($active ? 'var(--green)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--navy)' : 'var(--slate)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--green)' : 'var(--lightest-navy)')};
  border-radius: 25px;
  padding: 10px 24px;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: ${({ $active }) => ($active ? 'var(--navy)' : 'var(--green)')};
    border-color: var(--green);
    transform: translateY(-2px);
  }
`;

const StyledGallery = styled.div`
  column-count: 3;
  column-gap: 16px;
  width: 100%;
  line-height: 0;

  @media (max-width: 1080px) {
    column-count: 2;
  }

  @media (max-width: 600px) {
    column-count: 1;
  }
`;

const StyledPhotoCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    var(--light-navy) 25%,
    var(--lightest-navy) 50%,
    var(--light-navy) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio || '4 / 3'};
  break-inside: avoid;
  page-break-inside: avoid;
  display: block;
  width: 100%;
  margin-bottom: 16px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      transparent 60%,
      rgba(10, 25, 47, 0.9) 100%
    );
    opacity: 0;
    transition: var(--transition);
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover .photo-overlay {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover img {
    transform: scale(1.05);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation: ${fadeIn} 0.6s ease-out forwards;
  }

  &.loaded {
    animation: none;
    background: transparent;
  }
`;

const StyledPhotoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: var(--transition);
  line-height: 1.4;

  h4 {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    margin: 0 0 6px;
  }

  p {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    margin: 0;
    font-family: var(--font-mono);
  }

  .photo-meta {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    font-size: var(--fz-xxs);
    color: var(--slate);
    font-family: var(--font-mono);

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

const StyledLightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(2, 12, 27, 0.97);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${lightboxFade} 0.3s ease-out;
  backdrop-filter: blur(10px);

  img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
  }
`;

const StyledLightboxClose = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  border: none;
  color: var(--lightest-slate);
  font-size: 32px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);

  &:hover {
    color: var(--green);
    background: var(--light-navy);
  }
`;

const StyledLightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--light-navy);
  border: none;
  color: var(--lightest-slate);
  font-size: 24px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
  ${({ $direction }) => ($direction === 'prev' ? 'left: 30px;' : 'right: 30px;')}

  &:hover {
    color: var(--green);
    background: var(--lightest-navy);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    ${({ $direction }) => ($direction === 'prev' ? 'left: 15px;' : 'right: 15px;')}
  }
`;

const StyledLightboxInfo = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--light-slate);

  h3 {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    margin: 0 0 8px;
  }

  p {
    font-size: var(--fz-sm);
    margin: 0;
    font-family: var(--font-mono);
  }

  .counter {
    margin-top: 12px;
    font-size: var(--fz-xxs);
    color: var(--slate);
    font-family: var(--font-mono);
  }
`;

const StyledEmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--slate);

  svg {
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    color: var(--lightest-navy);
  }

  h3 {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    margin-bottom: 12px;
  }

  p {
    font-size: var(--fz-md);
  }
`;

// Sample photos data - replace with your own photos
const photosData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
    title: 'Mountain Sunrise',
    location: 'Swiss Alps',
    category: 'nature',
    date: '2024',
    aspectRatio: '4 / 3',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    title: 'Tokyo Streets',
    location: 'Japan',
    category: 'travel',
    date: '2024',
    aspectRatio: '3 / 4',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    title: 'Foggy Forest',
    location: 'Pacific Northwest',
    category: 'nature',
    date: '2024',
    aspectRatio: '16 / 9',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    title: 'Starry Night',
    location: 'Iceland',
    category: 'nature',
    date: '2023',
    aspectRatio: '16 / 9',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80',
    title: 'Urban Geometry',
    location: 'New York',
    category: 'architecture',
    date: '2023',
    aspectRatio: '1 / 1',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    title: 'Alpine Lake',
    location: 'Dolomites, Italy',
    category: 'nature',
    date: '2023',
    aspectRatio: '4 / 3',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    title: 'City Lights',
    location: 'Singapore',
    category: 'travel',
    date: '2023',
    aspectRatio: '16 / 9',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80',
    title: 'Modern Lines',
    location: 'Dubai',
    category: 'architecture',
    date: '2023',
    aspectRatio: '3 / 4',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80',
    title: 'Ocean Waves',
    location: 'Maldives',
    category: 'nature',
    date: '2024',
    aspectRatio: '4 / 3',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    title: 'Golden Hour Portrait',
    location: 'California',
    category: 'portrait',
    date: '2024',
    aspectRatio: '3 / 4',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    title: 'Festival Moments',
    location: 'Barcelona',
    category: 'travel',
    date: '2024',
    aspectRatio: '4 / 3',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80',
    title: 'Concrete Dreams',
    location: 'London',
    category: 'architecture',
    date: '2023',
    aspectRatio: '3 / 4',
  },
];

const categories = ['all', 'nature', 'travel', 'architecture', 'portrait'];

const PhotosPage = ({ location }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});
  const revealTitle = useRef(null);
  const revealGallery = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredPhotos =
    activeFilter === 'all'
      ? photosData
      : photosData.filter(photo => photo.category === activeFilter);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealGallery.current, srConfig(200, 0));
  }, []);

  const handleImageLoad = useCallback(id => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  }, []);

  const openLightbox = useCallback(photo => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateLightbox = useCallback(
    direction => {
      const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % filteredPhotos.length;
      } else {
        newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
      }
      setSelectedPhoto(filteredPhotos[newIndex]);
    },
    [filteredPhotos, selectedPhoto],
  );

  useEffect(() => {
    const handleKeyDown = e => {
      if (!selectedPhoto) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, closeLightbox, navigateLightbox]);

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) + 1
    : 0;

  return (
    <Layout location={location}>
      <Helmet title="Photos" />

      <StyledMainContainer>
        <header ref={revealTitle}>
          <h1 className="big-heading">Photos</h1>
          <StyledSubtitle>
            Capturing moments through my lens — a visual journey through places, people, and
            perspectives that inspire me.
          </StyledSubtitle>
        </header>

        <StyledFilterContainer>
          {categories.map(category => (
            <StyledFilterButton
              key={category}
              $active={activeFilter === category}
              onClick={() => setActiveFilter(category)}>
              {category}
            </StyledFilterButton>
          ))}
        </StyledFilterContainer>

        <div ref={revealGallery}>
          {filteredPhotos.length > 0 ? (
            <StyledGallery>
              {filteredPhotos.map(photo => (
                <StyledPhotoCard
                  key={photo.id}
                  $aspectRatio={photo.aspectRatio}
                  className={loadedImages[photo.id] ? 'loaded' : ''}
                  onClick={() => openLightbox(photo)}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    onLoad={() => handleImageLoad(photo.id)}
                  />
                  <StyledPhotoOverlay className="photo-overlay">
                    <h4>{photo.title}</h4>
                    <p>{photo.location}</p>
                    <div className="photo-meta">
                      <span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {photo.location}
                      </span>
                      <span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                        </svg>
                        {photo.date}
                      </span>
                    </div>
                  </StyledPhotoOverlay>
                </StyledPhotoCard>
              ))}
            </StyledGallery>
          ) : (
            <StyledEmptyState>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <h3>No photos found</h3>
              <p>Try selecting a different category</p>
            </StyledEmptyState>
          )}
        </div>

        {selectedPhoto && (
          <StyledLightbox onClick={closeLightbox}>
            <StyledLightboxClose onClick={closeLightbox}>×</StyledLightboxClose>

            <StyledLightboxNav
              $direction="prev"
              onClick={e => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}>
              ‹
            </StyledLightboxNav>

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div onClick={e => e.stopPropagation()}>
              <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            </div>

            <StyledLightboxNav
              $direction="next"
              onClick={e => {
                e.stopPropagation();
                navigateLightbox('next');
              }}>
              ›
            </StyledLightboxNav>

            <StyledLightboxInfo onClick={e => e.stopPropagation()}>
              <h3>{selectedPhoto.title}</h3>
              <p>{selectedPhoto.location}</p>
              <div className="counter">
                {currentIndex} / {filteredPhotos.length}
              </div>
            </StyledLightboxInfo>
          </StyledLightbox>
        )}
      </StyledMainContainer>
    </Layout>
  );
};

PhotosPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PhotosPage;
