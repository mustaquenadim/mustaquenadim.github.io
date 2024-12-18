import BlogsLayout from '@components/layouts/blogs-layout';
import { BlogPosts } from '@components/posts';

export const metadata = {
  title: 'Blogs',
  description: 'Browse all published blog posts by Mustaque Nadim',
};

const BlogsPage: React.FC = () => {
  return (
    <BlogsLayout>
      <BlogPosts />
    </BlogsLayout>
  );
};

export default BlogsPage;
