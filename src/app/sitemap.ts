import { getBlogPosts } from '@utils/getPost';

export const baseUrl = 'http://localhost:3000';

export default async function sitemap() {
  let blogs = getBlogPosts().map(post => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/post'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
