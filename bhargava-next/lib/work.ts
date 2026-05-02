import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const WORK_DIR = path.join(process.cwd(), 'content/work');

type FrontmatterData = Record<string, string | number | boolean | null | undefined | FrontmatterData>;

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
  thumbnail?: string;
  thumbnailMobile?: string;
}

export interface WorkWithContent extends WorkMeta {
  content: string;
  shortStory?: {
    whatHappened: string;
    howWeSolved: string;
    outcome: string;
  };
}

function stripMarkdown(value: string): string {
  return value
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimSummary(value: string, limit = 220): string {
  if (value.length <= limit) return value;

  const shortened = value.slice(0, limit);
  const lastSentence = Math.max(shortened.lastIndexOf('. '), shortened.lastIndexOf(' — '));
  if (lastSentence > limit * 0.55) {
    return shortened.slice(0, lastSentence + 1).trim();
  }

  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace).trim()}…`;
}

function extractSection(rawContent: string, headings: string[]): string {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  const escapedHeadings = headings.map((heading) => heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(
    `^##\\s+(?:${escapedHeadings.join('|')})\\s*\\n([\\s\\S]*?)(?=^##\\s+|\\Z)`,
    'im'
  );
  const match = normalized.match(pattern);
  if (!match) return '';

  const firstParagraph = match[1]
    .trim()
    .split(/\n\s*\n/)[0]
    .trim();

  return trimSummary(stripMarkdown(firstParagraph));
}

function buildShortStory(rawContent: string) {
  const whatHappened = extractSection(rawContent, ['The problem', 'Problem']);
  const howWeSolved = extractSection(rawContent, ['What we did', 'The solution', 'Solution']);
  const outcome = extractSection(rawContent, ['The outcome', 'Outcome', 'Results']);

  if (!whatHappened || !howWeSolved || !outcome) return undefined;

  return {
    whatHappened,
    howWeSolved,
    outcome,
  };
}

function readShortStory(data: FrontmatterData, rawContent: string) {
  if (
    data.shortStory?.whatHappened &&
    data.shortStory?.howWeSolved &&
    data.shortStory?.outcome
  ) {
    return {
      whatHappened: String(data.shortStory.whatHappened).trim(),
      howWeSolved: String(data.shortStory.howWeSolved).trim(),
      outcome: String(data.shortStory.outcome).trim(),
    };
  }

  return buildShortStory(rawContent);
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
        thumbnail: data.thumbnail || '',
        thumbnailMobile: data.thumbnailMobile || '',
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
    thumbnail: data.thumbnail || '',
    thumbnailMobile: data.thumbnailMobile || '',
    content: processed.toString(),
    shortStory: readShortStory(data as FrontmatterData, content),
  };
}

export function getAllWorkSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
