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
    const contentDirectory = path.join(process.cwd(), 'content', 'featured');
    const markdownFiles = getMarkdownFiles(contentDirectory);

    const featuredProjects = await Promise.all(
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
          },
          content: htmlContent,
          filePath: relativePath,
        };
      }),
    );

    const sortedProjects = featuredProjects.sort(
      (a, b) => parseInt(b.frontmatter.date) - parseInt(a.frontmatter.date),
    );

    return NextResponse.json(sortedProjects);
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
