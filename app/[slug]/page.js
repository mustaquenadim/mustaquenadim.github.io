import PostPage from './post-page';
import { getPostSlugs, getPostBySlug, getPostHtml } from '@lib/markdown';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const html = await getPostHtml(post.content);

  return (
    <PostPage
      frontmatter={post.frontmatter}
      html={html}
    />
  );
}
