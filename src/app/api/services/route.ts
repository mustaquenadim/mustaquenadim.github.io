import fs from 'fs';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const contentDirectory = path.join(process.cwd(), 'content/services');
  const files = fs.readdirSync(contentDirectory);

  const services = files.map(filename => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: filename.replace('.md', ''),
      frontmatter: data,
      content,
    };
  });

  const sortedServices = services
    .filter(service => service.frontmatter.showInServices)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  return NextResponse.json(sortedServices);
}
