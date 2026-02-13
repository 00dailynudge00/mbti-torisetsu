import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  defaultYear: number;
  defaultMonth: number;
  adsensePublisherId: string;
  adsenseEnabled: boolean;
}

export interface TypeInfo {
  name: string;
  label: string;
  animalRole: string;
  icon: string;
  description: string;
}

export interface YearData {
  year: number;
  theme: string;
  description: string;
}

export interface MonthData {
  month: number;
  name: string;
  theme: string;
  description: string;
}

// データディレクトリのパス
const dataDir = path.join(process.cwd(), 'data');
const contentDir = path.join(process.cwd(), 'content');

// サイト設定を取得
export function getSiteConfig(): SiteConfig {
  const filePath = path.join(dataDir, 'site.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// 全タイプ情報を取得
export function getAllTypes(): Record<string, TypeInfo> {
  const filePath = path.join(dataDir, 'types.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// 特定タイプ情報を取得
export function getTypeInfo(type: string): TypeInfo | null {
  const types = getAllTypes();
  return types[type] || null;
}

// 年データを取得
export function getYearData(year: number): YearData | null {
  try {
    const filePath = path.join(dataDir, 'years', `${year}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

// 月データを取得
export function getMonthData(month: number): MonthData | null {
  try {
    const monthStr = String(month).padStart(2, '0');
    const filePath = path.join(dataDir, 'months', `${monthStr}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

// 「今月の空気」を合成
export function getMonthlyAtmosphere(year: number, month: number): string {
  const yearData = getYearData(year);
  const monthData = getMonthData(month);

  if (!yearData || !monthData) {
    return '今月の空気を読み込めませんでした。';
  }

  return `${year}年は「${yearData.theme}」。${yearData.description} ${monthData.name}（${month}月）は「${monthData.theme}」がテーマです。${monthData.description}`;
}

// 特定月のコンテンツ一覧を取得
export function getMonthlyTypes(year: number, month: number): string[] {
  const monthStr = String(month).padStart(2, '0');
  const monthDir = path.join(contentDir, String(year), monthStr);

  if (!fs.existsSync(monthDir)) {
    return [];
  }

  const files = fs.readdirSync(monthDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

// Markdownをパースして HTML に変換
export async function parseMarkdown(content: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(content);
  return result.toString();
}

// 特定タイプの月次コンテンツを取得
export function getMonthlyContent(year: number, month: number, type: string): string | null {
  try {
    const monthStr = String(month).padStart(2, '0');
    const filePath = path.join(contentDir, String(year), monthStr, `${type}.md`);
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

// 利用可能な年月の一覧を取得
export function getAvailableYearMonths(): Array<{ year: number; month: number }> {
  const result: Array<{ year: number; month: number }> = [];

  if (!fs.existsSync(contentDir)) {
    return result;
  }

  const years = fs.readdirSync(contentDir).filter(item => {
    const itemPath = path.join(contentDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const yearStr of years) {
    const year = parseInt(yearStr);
    const yearPath = path.join(contentDir, yearStr);
    const months = fs.readdirSync(yearPath).filter(item => {
      const itemPath = path.join(yearPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const monthStr of months) {
      const month = parseInt(monthStr);
      result.push({ year, month });
    }
  }

  // 年月でソート（新しい順）
  result.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  return result;
}
