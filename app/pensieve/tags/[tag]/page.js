import TagPage from './tag-page';
import { getAllTags, getPostsByTag } from '@lib/markdown';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({
    tag: tag.fieldValue.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  return {
    title: `Tagged: #${tag}`,
  };
}

export default async function Page({ params }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return <TagPage tag={tag} posts={posts} />;
}
