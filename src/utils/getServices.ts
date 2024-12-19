import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getServices() {
  const contentDirectory = path.join(process.cwd(), 'content/services');
  const files = fs.readdirSync(contentDirectory);

  const services = files.map(filename => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      frontmatter: data,
      html: content,
    };
  });

  return services.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}
