import PensievePage from './pensieve-page';
import { getAllPosts } from '@lib/markdown';

export const metadata = {
  title: 'Pensieve',
};

export default async function Page() {
  const posts = getAllPosts();

  return <PensievePage posts={posts} />;
}
