import fs from 'fs';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      return [fullPath];
    }
    return [];
  });
}

function findAssociatedImage(mdFilePath: string): string | null {
  const dir = path.dirname(mdFilePath);
  const fileContent = fs.readFileSync(mdFilePath, 'utf8');
  const { data } = matter(fileContent);

  if (data.cover) {
    const imagePath = path.join(dir, data.cover);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

export async function GET() {
  try {
    const contentDirectory = path.join(process.cwd(), 'content', 'jobs');
    const markdownFiles = getMarkdownFiles(contentDirectory);

    const jobsData = await Promise.all(
      markdownFiles.map(async filePath => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = await markdownToHtml(content);
        const relativePath = path.relative(contentDirectory, filePath);
        const slug = path.basename(filePath, path.extname(filePath));

        const imagePath = findAssociatedImage(filePath);
        const imageRelativePath = imagePath ? path.relative(process.cwd(), imagePath) : null;

        return {
          slug,
          frontmatter: {
            ...data,
            date: data.date || null,
            cover: imageRelativePath ? `/${imageRelativePath.replace(/\\/g, '/')}` : null,
          },
          content: htmlContent,
          filePath: relativePath,
        };
      }),
    );

    const sortedJobs = jobsData.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(sortedJobs);
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
