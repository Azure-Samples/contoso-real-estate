import crypto from 'node:crypto';

export function anonymizeString(str: string): string {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
}

export function createTokenCacheKey(token: string): string {
  return `token:${token}`;
}

export function createSuggestionCacheKey(token: string): string {
  return `suggestion:${token}`;
}

export async function delay(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function retry<T>(fn: () => Promise<T>, maxTries = 3): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (maxTries > 0) {
      return retry(fn, maxTries - 1);
    }
    throw error;
  }
}

export function unescapeHtml(html?: string) {
  return (
    html
      ?.replaceAll(/&(amp|#38);/gi, '&')
      .replaceAll(/&(lt|#60);/gi, '<')
      .replaceAll(/&(gt|#62);/gi, '>')
      .replaceAll(/&(quot|#34);/gi, '"')
      .replaceAll(/&(apos|#39);/gi, "'")
      .replaceAll(/&#(\d+);/gi, (_match, numberString: string) => {
        const number_ = Number.parseInt(numberString, 10);
        return String.fromCodePoint(number_);
      }) ?? ''
  );
}

export function sanitizeForEmbedding(raw: string) {
  // Remove HTML doctype
  raw = raw.replace(/<!DOCTYPE[^>]*>/g, " ");
  // Remove HTML head
  raw = raw.replace(/<head\b[^>]*>[\s\S]*<\/head>/g, " ");
  // Remove HTML scripts
  raw = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ");
  // Remove HTML styles
  raw = raw.replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, " ");
  // Remove HTML tags
  raw = raw.replace(/<[^>]*>/g, " ");
  // Remove Markdown tables
  raw = raw.replace(/[-|]{2,}/g, " ");
  // Remove Markdown code blocks
  raw = raw.replace(/```[\s\S]*```/g, " ");
  // Remove Markdown bold, italic, strikethrough, code, heading, table delimiters, links, images, comments, and horizontal rules
  raw = raw.replace(/[*_`~#|!\[\]<>-]+/g, " ");
  // Remove line returns, tabs and spaces
  raw = raw.replace(/[\n\t\v ]+/g, " ");
  // Remove HTML entities
  raw = unescapeHtml(raw);
  // Remove leading and trailing spaces
  raw = raw.trim();

  return raw;
}
