import TagsLayout from '@components/layouts/tags-layout';
import TagList from '@components/tag-list';

export const metadata = {
  title: 'Tags',
  description: 'Browse blog posts by tags',
};

const TagsPage = () => {
  return (
    <TagsLayout>
      <TagList />
    </TagsLayout>
  );
};

export default TagsPage;
