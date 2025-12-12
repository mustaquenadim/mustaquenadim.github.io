import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs() {
  const postsDirectory = path.join(contentDirectory, 'posts');
  if (!fs.existsSync(postsDirectory)) return [];

  const folders = fs.readdirSync(postsDirectory);
  return folders.filter(folder => {
    const fullPath = path.join(postsDirectory, folder);
    return fs.statSync(fullPath).isDirectory();
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(contentDirectory, 'posts', slug, 'index.md');
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}

export async function getPostHtml(content) {
  const result = await remark().use(html).process(content);
  return result.toString();
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter(post => post !== null && !post.frontmatter.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB - dateA;
    });
  return posts;
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagsMap = {};

  posts.forEach(post => {
    const tags = post.frontmatter.tags || [];
    tags.forEach(tag => {
      if (tagsMap[tag]) {
        tagsMap[tag]++;
      } else {
        tagsMap[tag] = 1;
      }
    });
  });

  return Object.entries(tagsMap).map(([fieldValue, totalCount]) => ({
    fieldValue,
    totalCount,
  }));
}

export function getPostsByTag(tag) {
  const posts = getAllPosts();
  return posts.filter(post => {
    const tags = post.frontmatter.tags || [];
    return tags.includes(tag);
  });
}

export function getJobsData() {
  const jobsDirectory = path.join(contentDirectory, 'jobs');
  if (!fs.existsSync(jobsDirectory)) return [];

  const folders = fs.readdirSync(jobsDirectory);
  const jobs = folders
    .filter(folder => {
      const fullPath = path.join(jobsDirectory, folder);
      return fs.statSync(fullPath).isDirectory();
    })
    .map(folder => {
      const fullPath = path.join(jobsDirectory, folder, 'index.md');
      if (!fs.existsSync(fullPath)) return null;

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
      };
    })
    .filter(job => job !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB - dateA;
    });

  return jobs;
}

export async function getJobsDataWithHtml() {
  const jobs = getJobsData();
  const jobsWithHtml = await Promise.all(
    jobs.map(async job => {
      const html = await getPostHtml(job.content);
      return {
        ...job,
        html,
      };
    }),
  );
  return jobsWithHtml;
}

export function getFeaturedProjects() {
  const featuredDirectory = path.join(contentDirectory, 'featured');
  if (!fs.existsSync(featuredDirectory)) return [];

  const folders = fs.readdirSync(featuredDirectory);
  const projects = folders
    .filter(folder => {
      const fullPath = path.join(featuredDirectory, folder);
      return fs.statSync(fullPath).isDirectory();
    })
    .map(folder => {
      const fullPath = path.join(featuredDirectory, folder, 'index.md');
      if (!fs.existsSync(fullPath)) return null;

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        folder,
        frontmatter: data,
        content,
      };
    })
    .filter(project => project !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateA - dateB;
    });

  return projects;
}

export async function getFeaturedProjectsWithHtml() {
  const projects = getFeaturedProjects();
  const projectsWithHtml = await Promise.all(
    projects.map(async project => {
      const html = await getPostHtml(project.content);
      return {
        ...project,
        html,
      };
    }),
  );
  return projectsWithHtml;
}

export function getServicesData() {
  const servicesDirectory = path.join(contentDirectory, 'services');
  if (!fs.existsSync(servicesDirectory)) return [];

  const files = fs.readdirSync(servicesDirectory);
  const services = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(servicesDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
      };
    })
    .filter(service => service.frontmatter.showInServices !== false)
    .sort((a, b) => {
      const orderA = a.frontmatter.order || 999;
      const orderB = b.frontmatter.order || 999;
      return orderA - orderB;
    });

  return services;
}

export async function getServicesDataWithHtml() {
  const services = getServicesData();
  const servicesWithHtml = await Promise.all(
    services.map(async service => {
      const html = await getPostHtml(service.content);
      return {
        ...service,
        html,
      };
    }),
  );
  return servicesWithHtml;
}

export function getProjectsData() {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  if (!fs.existsSync(projectsDirectory)) return [];

  const files = fs.readdirSync(projectsDirectory);
  const projects = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(projectsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB - dateA;
    });

  return projects;
}

export async function getProjectsDataWithHtml() {
  const projects = getProjectsData();
  const projectsWithHtml = await Promise.all(
    projects.map(async project => {
      const html = await getPostHtml(project.content);
      return {
        ...project,
        html,
      };
    }),
  );
  return projectsWithHtml;
}
