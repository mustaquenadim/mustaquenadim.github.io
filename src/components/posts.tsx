import { getBlogPosts } from '@utils/getPost';
import BlogGrid from './blog-grid';

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return <BlogGrid allBlogs={allBlogs} />;
}
