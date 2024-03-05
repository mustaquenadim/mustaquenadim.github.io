import {
  IconAppStore,
  IconArticle,
  IconBookmark,
  IconCodepen,
  IconDesign,
  IconEcommerce,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconMobile,
  IconOptimization,
  IconPlayStore,
  IconPlugin,
  IconStar,
  IconTwitter,
  IconWebsite,
} from '@components/icons';
import PropTypes from 'prop-types';
import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Codepen':
      return <IconCodepen />;
    case 'Ecommerce':
      return <IconEcommerce />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Article':
      return <IconArticle />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'Mobile':
      return <IconMobile />;
    case 'Twitter':
      return <IconTwitter />;
    case 'Website':
      return <IconWebsite />;
    case 'Plugin':
      return <IconPlugin />;
    case 'Optimization':
      return <IconOptimization />;
    case 'Design':
      return <IconDesign />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
