import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const WORK_DIR = path.join(process.cwd(), 'content/work');

export interface WorkMeta {
  slug: string;
  title: string;
  client: string;
  type: string;
  year: string;
  tag: string;
  category: string;
  surface: string;
  ratio: string;
  standfirst: string;
}

export interface WorkWithContent extends WorkMeta {
  content: string;
}

export function getAllWork(): WorkMeta[] {
  if (!fs.existsSync(WORK_DIR)) return [];

  const files = fs.readdirSync(WORK_DIR).filter(f => f.endsWith('.md'));

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(path.join(WORK_DIR, filename), 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || '',
        client: data.client || '',
        type: data.type || '',
        year: data.year || '',
        tag: data.tag || '',
        category: data.category || '',
        surface: data.surface || 'linen',
        ratio: data.ratio || '16 / 11',
        standfirst: data.standfirst || '',
      };
    })
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export async function getWorkBySlug(slug: string): Promise<WorkWithContent | null> {
  const filePath = path.join(WORK_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);

  return {
    slug,
    title: data.title || '',
    client: data.client || '',
    type: data.type || '',
    year: data.year || '',
    tag: data.tag || '',
    category: data.category || '',
    surface: data.surface || 'linen',
    ratio: data.ratio || '16 / 11',
    standfirst: data.standfirst || '',
    content: processed.toString(),
  };
}

export function getAllWorkSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
