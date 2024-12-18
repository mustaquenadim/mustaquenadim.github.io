import TagPageLayout from '@components/layouts/tag-page-layout';
import PostsByTag from '@components/posts-by-tag';
import { getTagsWithCount } from '@utils/getPost';
import kebabCase from 'lodash/kebabCase';

export async function generateStaticParams() {
  const tags = getTagsWithCount();

  return tags
    .filter(tag => tag?.fieldValue) // Filter out null/undefined tags
    .map(tag => ({
      slug: kebabCase(tag),
    }));
}

export function generateMetadata({ params }) {
  return {
    title: `${params.slug}`,
    description: `Browse all blog posts tagged with ${params.slug}`,
  };
}

const TagPage = ({ params }: { params: { slug: string } }) => {
  const tag = params.slug;

  return (
    <TagPageLayout>
      <PostsByTag tag={tag} />
    </TagPageLayout>
  );
};

export default TagPage;
