import { getBlogPosts } from '@utils/getPost';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  let blogs = getBlogPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/blogs', '/blogs/tags'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
