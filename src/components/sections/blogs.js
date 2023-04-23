import { Icon } from '@components/icons';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';
import sr from '@utils/sr';
// import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const blogs = [
  {
    title: 'The Ultimate Guide to Mastering Any Programming Language!',
    description:
      'Learning a new programming language is a challenging, but incredibly rewarding, experience. It requires dedication, hard work, willingness to learn, and make mistakes.',
    tech: ['Learn to Code', 'Programming Tips', 'Beginners Guide', 'Programming Language'],
    external:
      'https://medium.com/@mustaquenadim/the-ultimate-guide-to-mastering-any-programming-language-5293d57cc169',
  },
  {
    title: 'Maximize Your Productivity with These Essential JavaScript Array Techniques',
    description:
      'Learn essential techniques for working with JavaScript arrays that will help you maximize your productivity.',
    tech: ['JavaScript', 'Beginners Guide', 'Array Methods'],
    external:
      'https://medium.com/@mustaquenadim/maximize-your-productivity-with-these-essential-javascript-array-techniques-f1a211bef347',
  },
  {
    title: 'JavaScript Strings 101: The Complete Beginner’s Guide',
    description:
      'Learn JavaScript string methods like charAt, concat, indexOf, lastIndexOf, slice and split in this beginner\'s guide.',
    tech: ['JavaScript', 'Beginners Guide', 'String Methods'],
    external:
      'https://medium.com/@mustaquenadim/javascript-strings-101-the-complete-beginners-guide-c5505823855d',
  },
];

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 48px;
        height: 48px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Blogs = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     projects: allMarkdownRemark(
  //       filter: {
  //         fileAbsolutePath: { regex: "/content/projects/" }
  //         frontmatter: { showInProjects: { ne: false } }
  //       }
  //       sort: { fields: [frontmatter___date], order: DESC }
  //     ) {
  //       edges {
  //         node {
  //           frontmatter {
  //             title
  //             tech
  //             github
  //             external
  //           }
  //           html
  //         }
  //       }
  //     }
  //   }
  // `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  // const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = blogs.slice(0, GRID_LIMIT);
  const publishedBlogs = showMore ? blogs : firstSix;

  const projectInner = node => {
    // const { frontmatter, html } = node;
    // const { github, external, title, tech } = frontmatter;
    const { title, description, tech, external } = node;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Article" />
            </div>
            <div className="project-links">
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: description }} />
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection id="blogs">
      <h2 className="numbered-heading" ref={revealTitle}>
        Recently Published Blogs
      </h2>

      {/* <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link> */}

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {publishedBlogs &&
              publishedBlogs.map((node, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {publishedBlogs &&
              publishedBlogs.map((node, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}
                >
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}
                  >
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
};

export default Blogs;
