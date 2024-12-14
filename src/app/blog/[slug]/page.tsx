import { CustomMDX } from '@components/custom-mdx';
import CustomPost from '@components/custom-post';
import { getBlogPosts } from '@utils/getPost';
import { notFound } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const components = {};

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
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
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
    <CustomPost data={metadata} content={content}>
      <CustomMDX source={content} />
    </CustomPost>
  );
};

export default PostPage;
