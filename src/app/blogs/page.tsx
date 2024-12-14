import BlogsLayout from '@components/blogs-layout';
import { BlogPosts } from '@components/posts';

const PensievePage: React.FC = () => {
  return (
    <BlogsLayout>
      <BlogPosts />
    </BlogsLayout>
  );
};

export default PensievePage;
