import { MDXProvider } from '@mdx-js/react';
import React from 'react';

const components = {};

const Content = ({ children }) => <MDXProvider components={components}>{children}</MDXProvider>;

export default Content;
