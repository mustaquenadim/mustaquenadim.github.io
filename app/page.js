import HomePage from './home-page';
import {
  getJobsDataWithHtml,
  getFeaturedProjectsWithHtml,
  getServicesDataWithHtml,
} from '@lib/markdown';

export default async function Page() {
  const [jobsData, featuredProjects, servicesData] = await Promise.all([
    getJobsDataWithHtml(),
    getFeaturedProjectsWithHtml(),
    getServicesDataWithHtml(),
  ]);

  return (
    <HomePage
      jobsData={jobsData}
      featuredProjects={featuredProjects}
      servicesData={servicesData}
    />
  );
}
