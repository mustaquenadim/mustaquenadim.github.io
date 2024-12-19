import BlogPost from '@components/blog-post';
import { CustomMDX } from '@components/custom-mdx';
import { getBlogPosts } from '@utils/getPost';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }): Metadata {
  let post = getBlogPosts().find(post => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist',
    };
  }

  const { title, summary } = post.metadata;

  return {
    title,
    description: summary,
  };
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  let post = getBlogPosts().find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

  return (
    <BlogPost data={metadata}>
      <CustomMDX source={content} />
    </BlogPost>
  );
};

export default PostPage;
