import TagsPage from './tags-page';
import { getAllTags } from '@lib/markdown';

export const metadata = {
  title: 'Tags',
};

export default async function Page() {
  const tags = getAllTags();

  return <TagsPage tags={tags} />;
}
