import { getBlogPosts } from '@utils/getPost';
import { StyledBlogs } from './styled-blogs';

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return <StyledBlogs allBlogs={allBlogs} />;
}
