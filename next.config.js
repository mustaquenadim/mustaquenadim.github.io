/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    // Required for `output: 'export'` (GitHub Pages) since Next's Image
    // Optimization API needs a server runtime.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Enable static export for GitHub Pages deployment
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;
