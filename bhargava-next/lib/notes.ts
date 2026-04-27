import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const NOTES_DIR = path.join(process.cwd(), 'content/notes');

export interface NoteMeta {
  slug: string;
  title: string;
  date: string;
  dateFormatted: string;
  tag: string;
  read: string;
  excerpt: string;
}

export interface NoteWithContent extends NoteMeta {
  content: string;
}

function formatDate(raw: string): string {
  try {
    const d = new Date(raw);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}.${dd}.${yyyy}`;
  } catch {
    return raw;
  }
}

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(path.join(NOTES_DIR, filename), 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        dateFormatted: formatDate(data.date || ''),
        tag: data.tag || '',
        read: data.read || '',
        excerpt: data.excerpt || '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNoteBySlug(slug: string): Promise<NoteWithContent | null> {
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    dateFormatted: formatDate(data.date || ''),
    tag: data.tag || '',
    read: data.read || '',
    excerpt: data.excerpt || '',
    content: processed.toString(),
  };
}

export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
