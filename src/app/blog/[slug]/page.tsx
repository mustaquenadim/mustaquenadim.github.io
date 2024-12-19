import BlogPost from '@components/blog-post';
import { CustomMDX } from '@components/custom-mdx';
import { getBlogPosts } from '@utils/getPost';
import { notFound } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find(post => {
    return post.slug === params.slug;
  });

  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;

  return {
    title,
    description,
  };
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  let post = getBlogPosts().find(post => post.slug === params.slug);
  const { metadata, content } = post;

  if (!post) {
    notFound();
  }

  return (
    <BlogPost data={metadata}>
      <CustomMDX source={content} />
    </BlogPost>
  );
};

export default PostPage;
