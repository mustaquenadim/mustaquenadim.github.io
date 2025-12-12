import ArchivePage from './archive-page';
import { getProjectsDataWithHtml } from '@lib/markdown';

export const metadata = {
  title: 'Archive',
};

export default async function Page() {
  const projects = await getProjectsDataWithHtml();

  return <ArchivePage projects={projects} />;
}
